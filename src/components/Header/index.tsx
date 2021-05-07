import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import { usePlayer } from '../../contexts/PlayerContext'

import styles from './styles.module.scss'

export function Header() {
    const { darkModeButton, darkMode } = usePlayer()

    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR,
    })

    return (
        <header className={darkMode ? styles.darkHeader : styles.headerContainer}>
            <a href="/"><img src="/logo.svg" alt="Podcastr-logo" /></a>

            <p>O melhor para você ouvir, sempre</p>

            <span>{currentDate}</span>

            <div className={styles.darkModeButtonContainer}>
                <input className={`${styles.switch} ${styles.switchShadow}`} type="checkbox" id="dark-mode" onClick={darkModeButton} />
                <label htmlFor="dark-mode"></label>
            </div>
        </header>
    )
}