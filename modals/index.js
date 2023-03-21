
import Message from "./Message";
import Cart from './Cart'
import AddMember from './AddMember'
import WaiterTables from './WaiterTables'
import User from './User'
import AddClient from './Clients/AddClient'

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
  {
    id: 4,
    route: "WaiterTables",
    component: WaiterTables,
  },
  {
    id: 5,
    route: "User",
    component: User,
  },
  {
    id: 6,
    route: "AddClient",
    component: AddClient,
  },
];
