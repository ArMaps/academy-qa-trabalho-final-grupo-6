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

    firstStarReview = '.stars > :nth-child(1)';
    inputReview = 'textarea';
    btnEnviarReview = '.rate-movie > button';

    novaReview = '.user-review-card';

    clickFirstStar(){
        cy.get(this.firstStarReview).should('be.visible').click();
    }

    typeReview(textoReview){
        cy.get(this.inputReview).should('be.visible').clear().type(textoReview);
    }

    clickBtnEnviarReview(){
        cy.get(this.btnEnviarReview).should('be.visible').click();
    }
}