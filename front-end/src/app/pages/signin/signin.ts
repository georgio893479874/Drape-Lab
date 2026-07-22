import { Component } from '@angular/core';
import { Form } from '../../components/form/form';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [Form],
  templateUrl: './signin.html',
})
export class Signin {}