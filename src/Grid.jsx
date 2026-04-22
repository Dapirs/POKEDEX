import React from 'react'
import Card from './Card'
import './styles/Grid.css'
import Search from "./Search.jsx";
import PokemonModal from './PokemonModal.jsx';

const PAGE_SIZE = 48;

export default function Grid() {
    const [pokemons, setPokemons] = React.useState([]);
    const [offset, setOffset] = React.useState(0);
    const [hasMore, setHasMore] = React.useState(true);
    const [loadingPage, setLoadingPage] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const isSearching = searchTerm.trim().length > 0;
    const [selectedPokemonId, setSelectedPokemonId] = React.useState(null);
    const [selectedPokemonDetails, setSelectedPokemonDetails] = React.useState(null);
    const [loadingSelectedPokemon, setLoadingSelectedPokemon] = React.useState(false);

    const fetchPokemonPage = React.useCallback(async (pageOffset) => {
        setLoadingPage(true);

        try {
            const listResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${pageOffset}`);
            const listData = await listResponse.json();

            const detailedPokemons = await Promise.all(
                listData.results.map(async (pokemon) => {
                    const detailResponse = await fetch(pokemon.url);
                    const detailData = await detailResponse.json();

                    return {
                        id: detailData.id,
                        name: detailData.name,
                        img: detailData.sprites.other['official-artwork'].front_default,
                        types: detailData.types.map((typeInfo) => typeInfo.type.name),
                    };
                })
            );

            setPokemons((prevPokemons) => [...prevPokemons, ...detailedPokemons]);
            setOffset(pageOffset + PAGE_SIZE);
            setHasMore(Boolean(listData.next));
        } catch (error) {
            console.error('Failed to fetch pokemon data', error);
        } finally {
            setLoadingPage(false);
        }
    }, []);

    React.useEffect(() => {
        fetchPokemonPage(0);
    }, [fetchPokemonPage]);

    React.useEffect(() => {
        if (!selectedPokemonId) {
            setSelectedPokemonDetails(null);
            setLoadingSelectedPokemon(false);
            return;
        }

        const controller = new AbortController();

        async function fetchSelectedPokemon() {
            setLoadingSelectedPokemon(true);

            try {
                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${selectedPokemonId}`,
                    { signal: controller.signal }
                );
                const details = await response.json();
                setSelectedPokemonDetails(details);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Failed to fetch selected pokemon details', error);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoadingSelectedPokemon(false);
                }
            }
        }

        fetchSelectedPokemon();

        return () => {
            controller.abort();
        };
    }, [selectedPokemonId]);

    function closePokemonModal() {
        setSelectedPokemonId(null);
        setSelectedPokemonDetails(null);
        setLoadingSelectedPokemon(false);
    }

    function openPokemonModal(pokemonId) {
        setLoadingSelectedPokemon(true);
        setSelectedPokemonId(pokemonId);
    }

    function searchUpdate(e){
        setSearchTerm(e.target.value);
    }

    const filteredPokemons = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const showLoadMoreHint = isSearching && filteredPokemons.length === 0 && !loadingPage;

    const selectedPokemon = filteredPokemons.map((pokemon) => (
        <Card
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            img={pokemon.img}
            types={pokemon.types}
            onClick={() => openPokemonModal(pokemon.id)}
        />
    ));

    const skeletonCards = Array.from({ length: PAGE_SIZE }, (_, index) => (
        <div key={`skeleton-${offset}-${index}`} className="skeleton-card" />
    ));

    return(
        <>
            <Search
                searchTerm={searchTerm}
                searchUpdate={searchUpdate}
            />
            <main>
                {selectedPokemon}
                {loadingPage && skeletonCards}
                {showLoadMoreHint && (
                    <p style={{
                        gridColumn: '1 / -1',
                        textAlign: 'center',
                        color: '#6b7280',
                        padding: '32px 16px',
                        margin: 0
                    }}>
                        No results in loaded Pokemon.{' '}
                        {hasMore && (
                            <button
                                type="button"
                                onClick={() => fetchPokemonPage(offset)}
                                style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 700, cursor: 'pointer', fontSize: 'inherit' }}
                            >
                                Load more to search further.
                            </button>
                        )}
                    </p>
                )}
            </main>
            {hasMore && (
                <div className="load-more-wrapper">
                    <button
                        type="button"
                        className="load-more-button"
                        onClick={() => fetchPokemonPage(offset)}
                        disabled={loadingPage}
                    >
                        {loadingPage ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            )}
            <PokemonModal
                pokemon={selectedPokemonDetails}
                isLoading={loadingSelectedPokemon}
                onClose={closePokemonModal}
            />
        </>
        )

}