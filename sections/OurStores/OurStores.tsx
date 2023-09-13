import type { SectionProps } from "$live/mod.ts";
import { createGraphqlClient } from "apps/utils/graphql.ts";

export async function loader() {
  const io = createGraphqlClient({
    endpoint: `https://avantivtexio.vtexcommercestable.com.br/api/io/_v/private/graphql/v1`,
  });
  const data = await io.query({
    query: `
  query allStores {
    AllStores(page: 1, pageSize: 10) {
      stores {
        id
        name
        image
        phoneNumber
        email
        manager
        notes
        expedient
        postalCode
        address
        addressComplements
        number
        district
        city
        state
        country
        latitude
        longitude
        customFields
      }
      pagination {
        total
        page
        pageSize
        lastPage
      }
    }
  }`,
  });
  return { data };
}

export default function OurStores({ data }: SectionProps<typeof loader>) {
  return (
    <div class="p-4">
      <h1 class="font-bold">Nossas lojas</h1>
      <ul>
        {data.AllStores.stores.map((store) => (
          <li>Nome da loja: {store.name}</li>
        ))}
      </ul>
    </div>
  );
}
