import React, { Component } from "react";
import BarraLateral from "./components/BarraLateral";
import BotoesArea from "./components/BotoesArea";

import "../../styles/css/home.css";

import {
  NoticiaCard,
  NoticiasContainer,
  NoticiaLoader,
} from "../../components/noticias";
import {
  LinkRapido,
  LinksRapidosContainer,
  LinksRapidosLoader,
} from "../../components/links-rapidos";
import {
  Evento,
  EventosContainer,
  EventosLoader,
} from "../../components/eventos";
import {
  Carousel,
  CarouselBanner,
  CarouselLoader,
} from "../../components/carousel";

import { Query } from "react-apollo";
import { GET_INICIO } from "../../utils/queries";
import NoticiasArea from "./components/NoticiasArea";
import BotaoItem from "./components/BotaoItem";
import BannerArea from "./components/BannerArea";

class Inicio extends Component {
  render() {
    return (
      <main role="main" className="container">
        <Query query={GET_INICIO}>
          {({ loading, error, data }) => {
            return (
              <React.Fragment>
                <div className="row mb-4 mt-4">
                  <BannerArea>
                    <Carousel>
                      {loading ? (
                        <CarouselLoader />
                      ) : error ? (
                        `Error! ${error.message}`
                      ) : (
                        data.banners.map((banner, index) => (
                          <CarouselBanner
                            key={index}
                            banner={
                              process.env.REACT_APP_API_URL + banner.Imagem.url
                            }
                            active={index == 0}
                          />
                        ))
                      )}
                    </Carousel>
                  </BannerArea>
                  
                    <BotoesArea>
                      <BotaoItem to="/area-aluno">Aluno</BotaoItem>
                      <BotaoItem to="/area-visitante">Visitante</BotaoItem>
                      <BotaoItem to="/area-docente">Docente</BotaoItem>
                    </BotoesArea>
                
                </div>
                <div className="row inicio" id="conteudo">
                  <NoticiasArea>
                    <NoticiasContainer more={false}>
                      {loading ? (
                        <NoticiaLoader />
                      ) : error ? (
                        `Error! ${error.message}`
                      ) : (
                        data.noticias.map((noticia, index) => (
                          <NoticiaCard
                            id={noticia._id}
                            title={noticia.Titulo}
                            description={noticia.Descricao}
                            imagem={noticia.Imagem}
                            imageAlt={noticia.Imagem_texto_alternativo}
                            date={noticia.createdAt}
                          />
                        ))
                      )}
                    </NoticiasContainer>
                  </NoticiasArea>
                  <BarraLateral>
                    <EventosContainer>
                      {loading ? (
                        <EventosLoader />
                      ) : error ? (
                        `Error! ${error.message}`
                      ) : (
                        data.eventos.sort(compare).map((evento, index) => (
                          <Evento
                            key={index}
                            titulo={evento.Titulo}
                            data={evento.Data}
                            local={evento.Local}
                          />
                        ))
                      )}
                    </EventosContainer>
                    <LinksRapidosContainer>
                      {loading ? (
                        <LinksRapidosLoader />
                      ) : error ? (
                        `Error! ${error.message}`
                      ) : (
                        data.links.map((link, index) => (
                          <LinkRapido
                            link={link.Link}
                            imagem={`${process.env.REACT_APP_API_URL}/${
                              link.Imagem.url
                            }`}
                            key={index}
                          />
                        ))
                      )}
                    </LinksRapidosContainer>
                  </BarraLateral>
                </div>
              </React.Fragment>
            );
          }}
        </Query>
      </main>
    );
  }
}

function compare(a, b) {
  if ( a.Data < b.Data ) return -1;
  else if ( a.Data > b.Data ) return 1;
  return 0;
}

export default Inicio;
