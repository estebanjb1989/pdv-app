import WaiterMenuAsset from "../assets/waiter_menu.png";

export const MenuProvider = [
  {
    title: "PDV",
    route: "PDV",
    visible: true,
    order: 10,
  },
  {
    title: "Recepcion",
    route: "Reception",
    visible: true,
    order: 10,
  },
  {
    title: "Control",
    route: "Control",
    visible: true,
    order: 10,
  },
  {
    title: "Ventas",
    route: "Sales",
    visible: true,
    order: 20,
  },
  {
    title: "Precios",
    route: "Prices",
    visible: true,
    order: 30,
  },
  {
    title: "Inventario",
    route: "Inventory",
    order: 40,
    visible: true,
  },
  {
    title: "Staff",
    route: "Staff",
    order: 45,
    visible: true,
  },
  {
    title: "Ajustes",
    route: "Adjustments",
    order: 50,
    visible: true,
  },
  {
    title: "Delivery",
    route: "DeliveryCategory",
    order: 60,
    visible: true,
  },
  {
    title: "Fin de jornada",
    route: "WorkingDay",
    visible: true,
    order: 10,
  },
  {
    title: "Salir",
    route: "Onboarding/SignIn",
    order: 70,
    visible: true,
  },
];

export const MenuClient = [
  {
    title: "Delivery",
    route: "DeliveryCategory",
    visible: true,
    order: 10,
  },
  {
    title: "Salir",
    route: "Onboarding/SignIn",
    order: 70,
    visible: true,
  },
];

export const MenuProviderWorkingDay = [
  {
    title: "Inicio de jornada",
    route: "WorkingDay",
    visible: true,
    order: 10,
  },
  {
    title: "Salir",
    route: "Onboarding/SignIn",
    order: 70,
    visible: true,
  },
];

export const MenuReporter = [
  {
    title: "Inventario",
    route: "Inventory",
    order: 40,
    visible: true,
  },
  {
    title: "Ajustes",
    route: "Adjustments",
    order: 50,
    visible: true,
  },
  {
    title: "Salir",
    route: "Onboarding/SignIn",
    order: 70,
    visible: true,
  },
];

export const MenuWaiter = [
  {
    title: "Carta",
    route: "DeliveryCategory",
    visible: true,
    order: 10,
    asset: WaiterMenuAsset,
  },
  {
    title: "Salir",
    route: "Onboarding/SignIn",
    order: 70,
    visible: true,
  },
];

export const MenuFullEscabio = [
  {
    title: "ADLC",
    route: "Clients",
    visible: true,
    order: 10,
    type: "Lookup",
    cta_add: true,
    cta_style: {
      marginRight: 12,
    },
    cta_add_link: "AddClient"
  },
  {
    title: "Productos",
    route: "Inventory",
    order: 20,
    visible: true,
    type: "Lookup",
  },
  {
    title: "Compras",
    route: "Reception",
    visible: true,
    order: 30,
    type: "Lookup",
  },
];
