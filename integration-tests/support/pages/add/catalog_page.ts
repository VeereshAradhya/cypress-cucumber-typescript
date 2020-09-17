import { addPage } from "../add/add_page";
import { addOptions, caatalogCards, catalogTypes } from "../../constants/add";
import { app } from "../app";

export const catalogPageObj = {
    search: 'input[placeholder="Filter by keyword..."]',
    card: 'a.pf-c-card',
    groupBy: '[data-test-id="dropdown-button"]',
    cardType: 'span.pf-c-badge',
    catalogTypes: {
      operatorBacked: '[data-test="kind-cluster-service-version"]',
      helmCharts: '[data-test="kind-helm-chart"]',
      builderImage: '[data-test="kind-image-stream"]',
      template: '[data-test="kind-template"]',
      serviceClass: '[data-test="kind-cluster-service-class"]',
    },
    cards: {
      mariaDBTemplate: '[data-test="Template-mariadb-persistent"]',
      phpCakeTemplate: '[data-test="Template-cakephp-mysql-persistent"]',
    },
    sidePane: {
      dialog: '[role="dialog"]',
      instantiateTemplate: '.pf-m-primary',
      create: 'a[title="Create"]',
      installHelmChart:'a[title="Install Helm Chart"]',
      createHelmChart: 'a[title="Install Helm Chart"]',
    },
    mariaDBTemplate: {
      namespace: '#namespace',
      title: 'h1.co-m-pane__heading',
      memoryLimit: '#MEMORY_LIMIT',
      imageSrreamNameSpace: '#NAMESPACE',
      databaseServiceName: '#DATABASE_SERVICE_NAME',
      mariaDBConnectionUserName: '#MYSQL_USER',
    },
    createknativeServing: {
      logo: 'h1.co-clusterserviceversion-logo__name__clusterserviceversion',
      name: '#root_metadata_name',
      labels: 'input[placeholder="app=frontend"]',
    },
    installHelmChart: {
      logo: 'h1.co-clusterserviceversion-logo__name__clusterserviceversion',
      install: '[data-test-id="submit-button"]',
      releaseName: '#form-input-releaseName-field',
      yamlView: '#form-radiobutton-editorType-yaml-field',
      formView: '#form-radiobutton-editorType-form-field',
      cancel: '[data-test-id="reset-button"]',
    }
}

export const catalogPage = {
  verifyTitle:() => cy.titleShouldBe('Developer Catalog'),
  isCheckBoxSelected: (type: string) => cy.get(`input[title="${type}"]`).should('be.checked'),
  isCardsDisplayed:() => cy.get(catalogPageObj.card).should('be.visible'),
  search: (keyword: string) => cy.get(catalogPageObj.search).clear().type(keyword),
  verifyDialog:() => cy.get(catalogPageObj.sidePane.dialog).should('be.visible'),
  verifyInstallHelmChartPage:() => cy.get('form h1').eq(0).should('have.text', 'Install Helm Chart'),
  clickInstantiateButtonOnSidePane:() => {
    catalogPage.verifyDialog();
    cy.get(catalogPageObj.sidePane.instantiateTemplate).click();
  },
  clickCreateButtonOnSidePane:() => {
    catalogPage.verifyDialog();
    cy.get(catalogPageObj.sidePane.create).click();
  },
  clickInstallHelmChartOnSidePane:() => {
    catalogPage.verifyDialog();
    cy.get(catalogPageObj.sidePane.installHelmChart).click();
  },
  clickOnCancelButton:() => cy.byButtonText('Cancel').click(),
  selectCatalogTypeCheckBox:(type: string | catalogTypes) => {
    switch (type) {
      case catalogTypes.OperatorBacked:
      case 'Operator Backed':
      {
        cy.get(catalogPageObj.catalogTypes.operatorBacked).check();
        break;
      }
      case catalogTypes.HelmCharts:
      case 'Helm Charts':
      {
        cy.get(catalogPageObj.catalogTypes.helmCharts).check();
        break;
      }
      case catalogTypes.BuilderImage:
      case 'Builder Image':
      {
        cy.get(catalogPageObj.catalogTypes.builderImage).check();
        break;
      }
      case catalogTypes.Template:
      case 'Template':
      {
        cy.get(catalogPageObj.catalogTypes.template).check();
        break;
      }
      case catalogTypes.ServiceClass:
      case 'Service Class':
      {
        cy.get(catalogPageObj.catalogTypes.serviceClass).check();
        break;
      }
      default: {
        throw new Error('Card is not available in Catalog');
      }
    }
  },
  selectknativeServingCard:() => cy.get('div.catalog-tile-pf-title').contains('knative Serving').click(),
  selectHelmChartCard:(cardName: string) => cy.get('a div.catalog-tile-pf-title').contains(cardName).click(),
  clickOnInstallButton:() => {
    cy.get(catalogPageObj.installHelmChart.install).click();
    app.waitForLoad(40000);
  },
  enterReleaseName:(releaseName: string) => cy.get(catalogPageObj.installHelmChart.releaseName).clear().type(releaseName),
  createHelmChartFromAddPage:(releaseName: string = 'nodejs-ex-k', helmChartName: string = 'Nodejs Ex K v0.2.0') => {
    addPage.verifyCard('Helm Chart');
    addPage.selectCardFromOptions(addOptions.HelmChart);
    catalogPage.verifyTitle();
    catalogPage.isCardsDisplayed();
    catalogPage.search(helmChartName);
    catalogPage.selectHelmChartCard(helmChartName);
    catalogPage.verifyDialog();
    cy.get(catalogPageObj.sidePane.createHelmChart).click();
    catalogPage.verifyInstallHelmChartPage();
    catalogPage.enterReleaseName(releaseName);
    catalogPage.clickOnInstallButton();
    cy.get('[data-test-id="namespace-bar-dropdown"] a').as('switcher');
    cy.get('@switcher').click();
    cy.byLegacyTestID('item-filter').clear().type(releaseName);
    cy.get('div.is-filtered').should('be.visible');
    cy.get('@switcher').click();
  },
  selectCardInCatalog : (card: caatalogCards | string) => {
    cy.byLegacyTestID('perspective-switcher-toggle').click();
    switch (card) {
      case caatalogCards.mariaDB:
      case 'MariaDB':
        {
          cy.get(catalogPageObj.cards.mariaDBTemplate).click();
          break;
        }
      case caatalogCards.dotnetCoreExample:
      case '.NET Core Example':
        {
          // cy.get(catalogPageObj.cards.phpCakeTemplate).click();
          // card name is not available
        }
      case caatalogCards.cakePhp:
      case 'CakePHP + MySQL':
        {
          cy.get(catalogPageObj.cards.phpCakeTemplate).click();
        }
      default: {
        throw new Error('Card is not available in Catalog');
      }
    }
  },
  verifyCardName:(partialCardName: string) => {
    cy.get(catalogPageObj.card).find('div.catalog-tile-pf-title').should('contain.text', partialCardName);
  },
}
