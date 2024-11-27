describe("forms tests", () => {
  beforeEach(() => {
    cy.visit("/forms");
  });
  it("Test subscribe form", () => {
    cy.contains(/Testing Forms/i);
    cy.getDataTest("subscribe-form").find("input").as("subscribe-input");
    cy.get("@subscribe-input").type("test@test.com");
    cy.contains(/Successfully subbed: test@test.com!/i).should("not.exist");
    cy.getDataTest("subscribe-button").click();
    cy.contains(/Successfully subbed: test@test.com!/i).should("exist");
    cy.wait(3000);
    cy.contains(/Successfully subbed: test@test.com!/i).should("not.exist");

    cy.get("@subscribe-input").type("test@test.io");
    cy.contains(/Invalid email: test@test.io!/i).should("not.exist");
    cy.getDataTest("subscribe-button").click();
    cy.contains(/Invalid email: test@test.io!/i).should("exist");
    cy.wait(3000);
    cy.contains(/Invalid email: test@test.io!/i).should("not.exist");

    cy.contains(/fail!/i).should("not.exist");
    cy.getDataTest("subscribe-button").click();
    cy.contains(/fail!/i).should("exist");
    cy.wait(3000);
    cy.contains(/fail!/i).should("not.exist");
  });
});
