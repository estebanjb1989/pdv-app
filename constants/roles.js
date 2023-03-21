import { MenuProvider, MenuClient, MenuProviderWorkingDay, MenuReporter, MenuWaiter, MenuFullEscabio } from './menu'

export default [
  {
    id: 1,
    name: "waiter",
    title: "Meser@",
    menu: MenuWaiter,
  },
  {
    id: 2,
    name: "teller",
    title: "Cajer@",
    menu: MenuProviderWorkingDay,
    usingWorkingDay: true,
  },
  {
    id: 3,
    name: "admin",
    title: "Admin",
    menu: MenuProvider,
  },
  {
    id: 4,
    name: "reporter",
    title: "Reportes",
    menu: MenuReporter,
  },
  {
    id: 4,
    name: "client",
    title: "Cliente",
    menu: MenuClient,
  },
  {
    id: 5,
    name: "fullescabio",
    title: "FullEscabio",
    menu: MenuFullEscabio,
  },
];
