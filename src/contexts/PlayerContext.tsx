import { createContext, ReactNode, useContext, useState } from 'react'

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Array<Episode>;
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    tooglePlay: () => void;
    toogleLoop: () => void;
    toogleShuffle: () => void;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void
    playNext: () => void
    playPrevious: () => void
    setPlayingState: (state: boolean) => void;
    clearPlayerState: () => void
    hasNext: boolean
    hasPrevious: boolean
}

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProvideProps = {
    children: ReactNode
}

export function PlayerContextProvider({ children }: PlayerContextProvideProps) {
    const [episodeList, setEpisodeList] = useState([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const [isShuffling, setIsShuffling] = useState(false)

    function play(episode: Episode) {
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0)
        setIsPlaying(true)
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list)
        setCurrentEpisodeIndex(index)
        setIsPlaying(true)
    }

    function tooglePlay() {
        setIsPlaying(!isPlaying)
    }

    function toogleLoop() {
        setIsLooping(!isLooping)
        setIsShuffling(false)
    }

    function toogleShuffle() {
        setIsShuffling(!isShuffling)
        setIsLooping(false)

    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state)
    }

    function clearPlayerState() {
        setEpisodeList([])
        setCurrentEpisodeIndex(0)
    }

    const hasPrevious = currentEpisodeIndex > 0
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

    function playNext() {
        if (isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nextRandomEpisodeIndex)
        } else if (hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1)
        }
    }

    function playPrevious() {
        if (hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1)
        }
    }

    return (
        <PlayerContext.Provider
            value={{
                episodeList,
                currentEpisodeIndex,
                play,
                playList,
                playNext,
                playPrevious,
                hasNext,
                hasPrevious,
                isPlaying,
                isLooping,
                isShuffling,
                tooglePlay,
                toogleLoop,
                toogleShuffle,
                setPlayingState,
                clearPlayerState
            }}
        >
            { children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}