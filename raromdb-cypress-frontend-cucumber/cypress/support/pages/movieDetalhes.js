class MovieDetalhes {
  constructor() {
    this.inputReview = 'textarea[placeholder="O que você acha deste filme ?"]';
    this.stars = ".stars";
    this.ratingStar = ".review-form-star.false";
    this.star = ".review-form-star";
    this.reviewCards = ".user-review-card";
    this.reviewCntainer = ".user-reviews-container";
    this.inputReviewArea = "textarea";
    this.btnRedirectToLogin = ".rate-movie > a";
    this.starDesabled = "review-form-star star-disabled";
    this.numberStar = ".filled";
    this.btnAvalia = ".rate-movie > button";
  }

  avaliarFilme(avaliacao) {
    cy.get(this.inputReview).type(avaliacao);
  }

  textAvali(avaliacao) {
    cy.get(this.inputReview).type(avaliacao);
  }

  clickRatingStars() {
    cy.get(this.stars).find(this.ratingStar).first().click();
  }

  clickStars() {
    cy.get(this.star).first().click();
  }

  typeReview(texto) {
    cy.get(this.inputReview).type(texto);
  }

  typeReviewNotChange(text) {
    cy.get(this.inputReviewArea)
      .invoke("val")
      .then((textInput) => {
        expect(textInput).to.include(text);
      });
  }

  botaoLoginAvalia = ".rate-movie > a";

  checkReviewText(text) {
    cy.get(".user-review-card")
      .last()
      .then(($reviewCard) => {
        cy.wrap($reviewCard)
          .find("p")
          .then(($text) => {
            const reviewText = $text.text();
            expect(reviewText).to.contain(text);
          });
      });
  }

  checkReviewStars(amount) {
    cy.get(".user-review-card")
      .last()
      .then(($reviewCard) => {
        cy.wrap($reviewCard)
          .find(".star-container-reviewcard .filled")
          .then(($stars) => {
            const filledStars = $stars.length;
            expect(filledStars).to.be.at.least(amount);
          });
      });
  }

  checkReviewName(name) {
    cy.get(".user-review-card")
      .last()
      .then(($reviewCard) => {
        cy.wrap($reviewCard)
          .find(".user-reviecard-info h3")
          .then(($name) => {
            const reviewName = $name.text();
            expect(reviewName).to.contain(name);
          });
      });
  }

  checkRevieAvalia() {
    cy.get(this.checkReviewText).clear().type(texto);
    cy.get(this.checkReviewStars).eq(numEstrelas).click();
    cy.get(this.btnAvalia).click();
  }
}

export default MovieDetalhes;
