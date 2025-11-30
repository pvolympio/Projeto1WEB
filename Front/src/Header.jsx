import "./styles/header.css"

export default function Header (){

    return(
        <header>
            
            <img className = "fifaLogo" src="./public/fifaLogo.png"></img>

            <nav className = "linksNav">
                <a href="https://www.fifa.com" target="_blank">Site oficial FIFA</a>
                <a href="https://github.com/pvolympio/Projeto1WEB" target="_blank">GitHub</a>
            </nav> 

        </header>
    )

}