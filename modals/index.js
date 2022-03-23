
import Message from "./Message";
import Cart from './Cart'
import AddMember from './AddMember'

export default [
  {
    id: 1,
    route: "Message",
    component: Message,
  },
  {
    id: 2,
    route: "Cart",
    component: Cart,
  },
  {
    id: 3,
    route: "AddMember",
    component: AddMember,
  },
];
