function criarUsuario() {
    return {
      nameM: faker.person.fullName(),
      emailM: faker.internet.email(),
      passwordM: faker.internet.password({ length: 10 }),
    };
  };

export default class ListarFilmesPage {

    // PAGINALOGIN //
    inputEmail = ':nth-child(1) > input';
    inputSenha = '.login-form > :nth-child(2) > input';
    b_Login = '.login-button';


    //PAGINA HOME DE LISTAR FILMES//
    linkLogin = '[href="/login"]';
    linkProfile = '[href="/profile"]';
    inputPesquisa = '.search-input';
    b_Pesquisa = '.search-button';
    b_Logo = '.logo';
    b_VoltarFD = '.featured-movies > .carousel-container > :nth-child(1)';
    b_AvancarFD = '.featured-movies > .carousel-container > :nth-child(3)';
    b_VoltarBA = '.top-rated-movies > .carousel-container > :nth-child(1)';
    b_AvancarBA = '.top-rated-movies > .carousel-container > :nth-child(3)';
    catalogoFilmes = '.search-movie-container';
    cabecalhoFD = '.featured-movies > .section-header';
    cabecalhoBA = '.top-rated-movies > .section-header';
    carrosselFilmes = '.featured-movies > .carousel-container > .carousel-data';
    carroselTopFilmes = '.top-rated-movies > .carousel-container > .carousel-data';

    movieCard = '[href="/movies/1"] > .movie-card-footer';
    titulo = '[href="/movies/1"] > .movie-card-footer > .movie-title';
    nota = '[href="/movies/1"] > .movie-card-footer > .neutral';
    descricao = '[href="/movies/1"] > .movie-card-footer > p';
    capa = '[href="/movies/1"] > .movie-details > .movie-poster';
 
    movieCard2 = '[href="/movies/2"] > .movie-card-footer';
    movieCard3 = '[href="/movies/3"] > .movie-card-footer';
    movieCard4 = '[href="/movies/4"] > .movie-card-footer';
    movieCard5 = '[href="/movies/5"] > .movie-card-footer';
    movieCard6 = '[href="/movies/6"] > .movie-card-footer';
    movieCard7 = '[href="/movies/7"] > .movie-card-footer';

    movieCardTop ='.top-rated-movies .carousel-data .movie-card';
    movieCardTopInside ='top-rated-movies .movie-card-footer' 
    EspacoTopMovies = '.top-rated-movies'


    // PAGINA DE DETALHES DO FILME//
    movieTitle = '.movie-details-title';
    avaliacaoAudiencia = '.movie-score-info > :nth-child(1)';
    avaliacaoCritica = '.movie-score-info > :nth-child(2)';
    movieDescription = '.movie-detail-description';
    movieData = '.movie-grid > :nth-child(2) > :nth-child(4)';
    movieTempo = '.movie-grid > :nth-child(2) > :nth-child(5)';
    movieGenero = ':nth-child(2) > :nth-child(6)';
    movieImagem = '.w-full';

    clickLinkLogin() {
        cy.get(this.linkLogin).should('be.visible').click();
    }
    clickButtonLogin() {
        cy.get(this.b_Login).should('be.visible').click();
    }
    typeLogin(email, senha) {
        cy.get(this.inputEmail).type(email);
        cy.get(this.inputSenha).type(senha);
        this.clickButtonLogin();
    }
    clickMovieCard() {
        cy.get(this.movieCard).should('be.visible').eq(0).click();
    }
    clickMovieCardTop() {
        cy.get(this.movieCardTop).should('be.visible').eq(0).as('btn').click()
    }
    inspecionaMovieCard() {
        cy.get(this.movieCard).should('be.visible');
        cy.get(this.titulo).should('be.visible');
        cy.get(this.nota).should('be.visible');
        cy.get(this.capa).should('be.visible');
        cy.get(this.descricao).should('be.visible');
    }
    inspecionaMoviesDestaque() {
        cy.get(this.movieCard).should('be.visible');
        cy.get(this.movieCard2).should('be.visible');
        cy.get(this.movieCard3).should('be.visible');
        cy.get(this.movieCard4).should('be.visible');
    }
    inspecionaMoviesTop() {
        cy.get(this.movieCardTop).eq(0).should('be.visible');
        cy.get(this.movieCardTop).eq(1).should('be.visible');
        cy.get(this.movieCardTop).eq(2).should('be.visible');
        cy.get(this.movieCardTop).eq(3).should('be.visible');
    }
    inspecionaMoviesDestaqueP2() {
        cy.get(this.movieCard4).should('be.visible');
        cy.get(this.movieCard5).should('be.visible');
        cy.get(this.movieCard6).should('be.visible');
        cy.get(this.movieCard7).should('be.visible');
    }
    inspecionaDetalhes() {
        cy.contains('Harry Potter e a Pedra Filosofal');
        cy.get(this.avaliacaoAudiencia).should('be.visible');
        cy.get(this.avaliacaoCritica).should('be.visible');
        cy.contains(this.movieDescription).should('be.visible')
        .should('be.equal','Harry Potter é um garoto órfão que vive infeliz com seus tios, os Dursleys. Ele recebe uma carta contendo um convite para ingressar em Hogwarts, uma famosa escola especializada em formar jovens bruxos.');
        cy.get(this.movieData).should('be.visible')
        .should('be.equal','2001');
        cy.get(this.movieGenero).should('be.visible')
        .should('be.equal','Aventura e ação'); 
        cy.get(this.movieTempo).should('be.visible')
        .should('be.equal','152');
        cy.get(this.movieImagem).should('be.visible');
    }
    
    clickAvancaFD() {
        cy.get(this.b_AvancarFD).should('be.visible').click();
    }
    clickAvancaBA() {
        cy.get(this.b_AvancarBA).should('be.visible').click();
    }

    filmeMocante(){
        return cy
        .request('POST','https://raromdb-3c39614e42d4.herokuapp.com/api/users',{
                "name": "Jotaro",
                "email": ffakerPT_BR.internet.email().toLowerCase({length: 10}),
                "password": "123456"
              }
         ).then((response)=>{
            response.body;
            expect(response.body).to.be.an('object');
            expect(response.body).have.property('type');
            expect(response.body.type).to.equal(0);
            cy.log(response.body.type);
         });
    }
}