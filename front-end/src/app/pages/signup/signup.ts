import { Component } from '@angular/core';
import { Form } from '../../components/form/form';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [Form],
  templateUrl: './signup.html',
})
export class Signup {}