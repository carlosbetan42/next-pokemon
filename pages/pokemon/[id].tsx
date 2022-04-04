import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Layout } from "../../components/layouts/Layout";
import pokeApi from "../../api/pokeApi";
import { Pokemon } from "../../interfaces";
import { Card, Grid, Text, Button, Container, Image } from "@nextui-org/react";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  return (
    <Layout title='Algún pokemon'>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || "/no-image.png"}
                alt={pokemon.name}
                width='100%'
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: "flex", justifyContent: "space-between" }}>
              <Text h1 transform='capitalize'>
                {pokemon.name}
              </Text>

              <Button color='gradient' ghost>
                Guardar en favoritos
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>

              <Container direction='row' display='flex'>
                <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100} />
                <Image src={pokemon.sprites.back_default} alt={pokemon.name} width={100} height={100} />
                <Image src={pokemon.sprites.front_shiny} alt={pokemon.name} width={100} height={100} />
                <Image src={pokemon.sprites.back_shiny} alt={pokemon.name} width={100} height={100} />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151Paths = Array.from({ length: 151 }, (_, i) => ({
    params: {
      id: `${i + 1}`,
    },
  }));

  return {
    paths: pokemons151Paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  return {
    props: {
      pokemon: {
        name: data.name,
        sprites: {
          front_default: data.sprites.front_default,
          back_default: data.sprites.back_default,
          front_shiny: data.sprites.front_shiny,
          back_shiny: data.sprites.back_shiny,
          other: data.sprites.other,
        },
      },
    },
  };
};

export default PokemonPage;
