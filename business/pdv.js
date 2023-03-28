import { getDatabase, ref, push, set } from "firebase/database";
import { CartTypes } from "../redux/types";
const dialog = null//require("electron").remote.dialog;

export const validateBarcode = (barcode, inventory) => {
  const item = inventory.find((item) => item.barcode.toString() === barcode);

  if (!item) {
    alert(barcode + " no encontrado");
    return null;
  }

  if (!item.price) {
    alert(barcode + " no tiene precio");
    return null;
  }

  if (!item.stock) {
    alert(barcode + " no tiene stock");
    return null;
  }

  return item;
};

export const updateCart = (product, items, inventory, dispatch) => {
  const existingItem = items.find((item) => item.barcode === product.barcode);

  const qty = (existingItem?.quantity || 0) + 1;
  const inventoryItem = inventory.find(
    (item) => item.barcode === product.barcode
  );
  if ((false && !inventoryItem.stock) || inventoryItem.stock - qty < 0) {
    alert("No hay stock suficiente");
    return;
  }

  if (existingItem) {
    const list = items.map((item) =>
      item.barcode === product.barcode
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    dispatch({
      type: CartTypes.SET_CART,
      payload: list,
    });
  } else {
    const list = [
      ...items,
      {
        ...product,
        id: items.length + 1,
        quantity: 1,
      },
    ];
    dispatch({
      type: CartTypes.SET_CART,
      payload: list,
    });
  }
};

export const calculateTotal = (items) => {
  return items.reduce((carry, value) => {
    return carry + value.price * value.quantity;
  }, 0);
};

export const handleDelete = (items, item, dispatch) => () => {
  if (item.quantity === 1) {
    dispatch({
      type: CartTypes.SET_CART,
      payload: items.filter((cartItem) => cartItem.barcode !== item.barcode),
    });
    return;
  }

  dispatch({
    type: CartTypes.SET_CART,
    payload: items.map((cartItem) =>
      cartItem.barcode === item.barcode
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    ),
  });
};

export const handleFinish = async (
  credentials,
  items,
  dispatch,
  refreshInventory
) => {
  debugger
  let options = {
    buttons: ["Si", "No"],
    message: "Confirma la venta?",
  };
  const response = dialog?.showMessageBoxSync?.(options);
  if (response === 0) {
    const db = getDatabase();
    let reference = ref(db, "sales");
    await push(reference, {
      userEmail: credentials.user.email,
      items,
      total: calculateTotal(items),
      soldOutAt: Date.now(),
    });

    /*for (const item of items) {
      reference = ref(db, "inventory/" + item.barcode);
      const qty = item.quantity;
      delete item.quantity;
      await set(reference, {
        ...item,
        stock: item.stock - qty,
      });
    }
    refreshInventory();*/
    dispatch({ type: CartTypes.SET_CART, payload: [] });
  }
};
