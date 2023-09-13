// this code does not work yet because it runs server side, while the resolver for the orderForm query need the user token

import type { SectionProps } from "$live/mod.ts";
import { createGraphqlClient } from "apps/utils/graphql.ts";

export async function loader() {
  const io = createGraphqlClient({
    endpoint: `https://avantivtexio.vtexcommercestable.com.br/api/io/_v/private/graphql/v1`,
  });
  try {
    const data = await io.query({
      query: `query OrderForm {
                orderForm @context(provider: "vtex.checkout-graphql") {
                  id
                  clientProfileData {
                    email
                  }
                  items {
                    id
                  }
                }
              }`,
    });
    return { data };
  } catch (e) {
    return Object.keys(e);
  }
}

const fetchData = () => {};

export default function OrderFormReader({ data }: SectionProps<typeof loader>) {
  return (
    <div class="p-4">
      <h1 class="font-bold">Dados do orderForm</h1>
      <p>
        {data ? (
          <ul>
            <li>E-mail: {data.orderForm.clientProfileData.email}</li>
            <li>Itens: {data.orderForm.items.map((item) => item.id)}</li>
          </ul>
        ) : (
          "Não foi possível carregar"
        )}
      </p>
    </div>
  );
}
