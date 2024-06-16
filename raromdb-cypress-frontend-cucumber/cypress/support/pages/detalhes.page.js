export default class DetailsPage {

    movieTitle = '.movie-details-title';
    avaliacaoAudiencia = '.movie-score-info > :nth-child(1)';
    avaliacaoCritica = '.movie-score-info > :nth-child(2)';
    movieDescription = '.movie-detail-description';
    movieData = '.movie-grid > :nth-child(2) > :nth-child(4)';
    movieTempo = '.movie-grid > :nth-child(2) > :nth-child(5)';
    movieGenero = ':nth-child(2) > :nth-child(6)';
    movieImagem = '.w-full';

    containerDetalhe = '.movie-details-container';
    containerStarsAudiencia = '.movie-score-info > :nth-child(1) > div';
    containerStarsCritica = '.movie-score-info > :nth-child(1) > div';

    firstStarReview = '.stars > :nth-child(1)';
    fourthStarReview = '.stars > :nth-child(4)';
    inputReview = 'textarea';
    btnEnviarReview = '.rate-movie > button';

    novaReview = '.user-review-card';

    dataHoraReview = '.user-reviews-container > :nth-child(1) > label';
    nomeReview = ':nth-child(1) > .user-review-info > .user-reviecard-info > h3';
    starsReview = '.star-container-reviewcard';
    textoReview = ':nth-child(1) > p';

    clickFirstStar(){
        cy.get(this.firstStarReview).should('be.visible').click();
    }

    clickFourthStar(){
        cy.get(this.fourthStarReview).should('be.visible').click();
    }

    typeReview(textoReview){
        cy.get(this.inputReview).should('be.visible').clear().type(textoReview);
    }

    clickBtnEnviarReview(){
        cy.get(this.btnEnviarReview).should('be.visible').click();
    }
}