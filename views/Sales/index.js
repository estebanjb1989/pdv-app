import moment from "moment";
import React, { useMemo } from "react";
import { Loading, DataTable, Container } from "../../component";
import {
  useBackButton,
  useDrawerToggler,
  useHeaderTitle,
  useSales,
} from "../../hook";

const Sales = () => {
  useDrawerToggler();

  const { loadingSales, sales } = useSales({
    refreshOnLoad: true,
  });

  const salesSorted = useMemo(() => {
    return sales.sort((a, b) => b.soldOutAt - a.soldOutAt);
  }, [sales]);

  if (loadingSales) {
    return <Loading />;
  }

  return (
    <Container scrollEnabled>
      <DataTable
        keyField="soldOutAt"
        dataSource={salesSorted}
        columns={[
          {
            key: "id",
            title: "ID",
            width: "10%",
          },
          {
            key: "soldOutAt",
            title: "Fecha",
            width: "20%",
            render: (original) => {
              return moment(original.soldOutAt).format("DD/MM/YYYY HH:mm");
            },
          },
          {
            key: "userEmail",
            title: "Vendedor",
            width: "50%",
          },
          {
            key: "total",
            title: "Total",
            width: "20%",
            alignEnd: true,
            render: (original) => {
              return original.total + " ARS";
            },
          },
        ]}
        detail={(item) => (
          <DataTable
            keyField="description"
            dataSource={item.items}
            columns={[
              {
                key: "description",
                title: "Producto",
                width: "25%",
              },
              {
                key: "price",
                title: "Precio",
                width: "25%",
                render: (original) => {
                  return original.price + " ARS";
                },
              },
              {
                key: "quantity",
                title: "Cantidad",
                width: "25%",
              },
              {
                key: "amount",
                title: "Importe",
                width: "25%",
                render: (original) => {
                  return original.price * original.quantity + " ARS";
                },
              },
            ]}
            allowPagination={false}
          />
        )}
      />
    </Container>
  );
};

export default Sales;
