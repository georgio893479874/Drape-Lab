import "dotenv/config";
import express, { Request, Response } from "express";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
app.use(cors({
  origin: `${process.env.FRONT_END_URL}`,
  credentials: true,
}));
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/categories", async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        parentId: null,
      },
    });

    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/categories/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      return res.status(404).json({
        error: "Категорія не знайдена",
      });
    }

    res.json(category);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/api/categories", async (req: Request, res: Response) => {
  try {
    const category = await prisma.category.create({
      data: req.body,
    });

    res.status(201).json(category);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.put("/api/categories/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const category = await prisma.category.update({
      where: {
        id: id,
      },
      data: req.body,
    });

    res.json(category);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.delete("/api/categories/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    await prisma.category.delete({
      where: {
        id: id,
      },
    });

    res.json({
      message: "Category is deleted",
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/api/products", async (req: Request, res: Response) => {
  try {
    const { categoryId, search, page = "1", limit = "20" } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {
      isActive: true,
    };

    if (categoryId) {
      where.categoryId = String(categoryId);
    }

    if (search) {
      where.OR = [
        {
          name: {
            contains: String(search),
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: String(search),
            mode: "insensitive",
          },
        },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          attributes: true,
        },
        skip,
        take: Number(limit),
      }),
      prisma.product.count({
        where,
      }),
    ]);

    res.json({
      data: products,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/api/products/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        category: true,
        attributes: true,
        reviews: true,
      },
    });

    if (!product) {
      return res.status(404).json({
        error: "Товар не знайдено",
      });
    }

    res.json(product);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/api/products", async (req: Request, res: Response) => {
  try {
    const { attributes, ...productData } = req.body;

    const product = await prisma.product.create({
      data: {
        ...productData,
        attributes: {
          create: attributes || [],
        },
      },
      include: {
        category: true,
        attributes: true,
      },
    });

    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.put("/api/products/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const { attributes, ...productData } = req.body;

    await prisma.productAttribute.deleteMany({
      where: {
        productId: id,
      },
    });

    const product = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        ...productData,
        attributes: {
          create: attributes || [],
        },
      },
      include: {
        category: true,
        attributes: true,
      },
    });

    res.json(product);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.delete("/api/products/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    await prisma.product.delete({
      where: {
        id: id,
      },
    });

    res.json({
      message: "Товар видалено",
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/api/users", async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        addresses: true,
      },
    });

    res.json(users);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        addresses: true,
        orders: true,
        reviews: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "Користувача не знайдено",
      });
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/api/users", async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash,
      },
    });

    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.put("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: req.body,
    });

    res.json(user);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.delete("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    await prisma.user.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Користувача видалено",
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/api/auth/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        error: "Невірний email або пароль",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Невірний email або пароль",
      });
    }

    res.json({
      message: "Вхід успішний",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/api/addresses", async (_req: Request, res: Response) => {
  try {
    const addresses = await prisma.address.findMany({
      include: {
        user: true,
      },
    });

    res.json(addresses);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/api/addresses/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const address = await prisma.address.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (!address) {
      return res.status(404).json({
        error: "Адресу не знайдено",
      });
    }

    res.json(address);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/api/users/:userId/addresses", async (req: Request, res: Response) => {
  try {
    const userId = String(req.params.userId);

    const addresses = await prisma.address.findMany({
      where: {
        userId,
      },
    });

    res.json(addresses);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/api/addresses", async (req: Request, res: Response) => {
  try {
    const address = await prisma.address.create({
      data: req.body,
    });

    res.status(201).json(address);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.put("/api/addresses/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const address = await prisma.address.update({
      where: {
        id,
      },
      data: req.body,
    });

    res.json(address);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.delete("/api/addresses/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    await prisma.address.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Адресу видалено",
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/api/cart/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const cart = await prisma.cart.findUnique({
      where: {
        id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({
        error: "Кошик не знайдено",
      });
    }

    res.json(cart);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/api/cart", async (req: Request, res: Response) => {
  try {
    const cart = await prisma.cart.create({
      data: {
        userId: req.body.userId,
        sessionId: req.body.sessionId,
      },
    });

    res.status(201).json(cart);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.post("/api/cart/:id/items", async (req: Request, res: Response) => {
  try {
    const cartId = String(req.params.id);

    const item = await prisma.cartItem.create({
      data: {
        cartId,
        productId: req.body.productId,
        quantity: req.body.quantity ?? 1,
      },
    });

    res.status(201).json(item);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.delete("/api/cart/items/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    await prisma.cartItem.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Товар видалено з кошика",
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/api/orders", async (_req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
        payment: true,
        user: true,
      },
    });

    res.json(orders);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/api/orders/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
        payment: true,
        user: true,
      },
    });

    if (!order) {
      return res.status(404).json({
        error: "Замовлення не знайдено",
      });
    }

    res.json(order);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/api/orders", async (req: Request, res: Response) => {
  try {
    const order = await prisma.order.create({
      data: {
        userId: req.body.userId,
        totalAmount: req.body.totalAmount,
        shippingMethod: req.body.shippingMethod,
        recipientName: req.body.recipientName,
        recipientPhone: req.body.recipientPhone,
        country: req.body.country,
        city: req.body.city,
        streetAddress: req.body.streetAddress,

        items: {
          create: req.body.items || [],
        },
      },
      include: {
        items: true,
      },
    });

    res.status(201).json(order);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.patch("/api/orders/:id/status", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status: req.body.status,
      },
    });

    res.json(order);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.get("/api/reviews", async (_req: Request, res: Response) => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        product: true,
        user: true,
      },
    });

    res.json(reviews);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/api/reviews", async (req: Request, res: Response) => {
  try {
    const review = await prisma.review.create({
      data: {
        productId: req.body.productId,
        userId: req.body.userId,
        userName: req.body.userName,
        rating: req.body.rating,
        comment: req.body.comment,
      },
    });

    res.status(201).json(review);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.patch("/api/reviews/:id/approve", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const review = await prisma.review.update({
      where: {
        id,
      },
      data: {
        isApproved: true,
      },
    });

    res.json(review);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.get("/api/payments", async (_req: Request, res: Response) => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        order: true,
      },
    });

    res.json(payments);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/api/payments", async (req: Request, res: Response) => {
  try {
    const payment = await prisma.payment.create({
      data: {
        orderId: req.body.orderId,
        amount: req.body.amount,
        provider: req.body.provider,
        currency: req.body.currency ?? "UAH",
        transactionId: req.body.transactionId,
      },
    });

    res.status(201).json(payment);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.patch("/api/payments/:id/status", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const payment = await prisma.payment.update({
      where: {
        id,
      },
      data: {
        status: req.body.status,
      },
    });

    res.json(payment);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
});

async function bootstrap() {
  try {
    await prisma.$connect();

    console.log("✅ PostgreSQL connected");
    console.log("✅ Prisma connected");

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Startup error:", error);
    process.exit(1);
  }
}

bootstrap();
