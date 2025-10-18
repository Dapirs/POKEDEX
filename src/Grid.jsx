import React from 'react'
import Card from './Card'

export default function Grid() {
    const [pokemons, setPokemons] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0')
            .then(res => res.json())
            .then(res => {
                setPokemons(res.results);
                setLoading(false);
                console.log(res.results);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    const selectedPokemon = pokemons.map(pokemon => (
        <Card key={pokemon.name} name={pokemon.name} />
    ));

    return <main>{selectedPokemon}</main>;
}