import { devNavigationMenu, switchPerspective } from "../constants/global";

export const app = {
  waitForLoad: (timeout: number = 30000) => {
    cy.get(".co-m-loader", { timeout: timeout }).should("not.be.visible");
  },
};

export const perspective = {
  verifyPerspective: (perspectiveName: string) => {
    cy.byLegacyTestID("perspective-switcher-toggle").should(
      "contain.text",
      perspectiveName
    );
  },

  skipGuidedTours: () => {
    cy.get("body div").then(($el) => {
      if ($el.find("#guided-tour-modal").length !== 0) {
        cy.get("#tour-step-footer-secondary").click();
      }
    });
  },

  switchTo: (perspectiveName: switchPerspective) => {
    cy.byLegacyTestID("perspective-switcher-toggle").click();
    switch (perspectiveName) {
      case switchPerspective.Administrator: {
        cy.get('li[role="menuitem"]').contains("Administrator").click();
        break;
      }
      case switchPerspective.Developer: {
        cy.get('li[role="menuitem"]').contains("Developer").click();
        break;
      }
      default: {
        throw new Error("Option is not available");
      }
    }
  },
};

export const naviagteTo = (opt: devNavigationMenu) => {
  switch (opt) {
    case devNavigationMenu.Add: {
      cy.byLegacyTestID("+Add-header").click();
      cy.url().should("include", "add");
      app.waitForLoad();
      break;
    }
    case devNavigationMenu.Topology: {
      cy.byLegacyTestID("topology-header")
        .click()
        .then(() => {
          cy.url().should("include", "topology");
        });
      break;
    }
    case devNavigationMenu.GitOps: {
      cy.byLegacyTestID("gitops-header")
        .click()
        .then(() => {
          cy.pageTitleShouldContain("GitOps");
        });
      break;
    }
    case devNavigationMenu.Monitoring: {
      cy.byLegacyTestID("monitoring-header")
        .click()
        .then(() => {
          cy.pageTitleShouldContain("Monitoring");
        });
      break;
    }
    case devNavigationMenu.Builds: {
      cy.byLegacyTestID("build-header").click();
      cy.pageTitleShouldContain("Build Configs");
      break;
    }
    case devNavigationMenu.Pipelines: {
      cy.byLegacyTestID("pipeline-header").click();
      cy.pageTitleShouldContain("Pipelines");
      break;
    }
    case devNavigationMenu.Search: {
      cy.byLegacyTestID("search-header").click();
      cy.pageTitleShouldContain("Search");
      break;
    }
    case devNavigationMenu.Helm: {
      cy.byLegacyTestID("helm-releases-header").click();
      cy.pageTitleShouldContain("Helm Releases");
      break;
    }
    case devNavigationMenu.Project: {
      cy.byLegacyTestID("project-details-header").click();
      break;
    }
    case devNavigationMenu.ConfigMaps: {
      cy.get("#ConfigMap").click();
      cy.pageTitleShouldContain("Config Maps");
      break;
    }
    case devNavigationMenu.Secrets: {
      cy.get("#Secret").click();
      cy.pageTitleShouldContain("Secrets");
      break;
    }
    default: {
      throw new Error("Option is not available");
    }
  }
};

export const projectNameSpace = {
  selectCreateProjectOption: () => {
    cy.byLegacyTestID("namespace-bar-dropdown").find("button").eq(0).click();
    cy.byTestDropDownMenu("#CREATE_RESOURCE_ACTION#").click();
  },

  enterProjectName: (projectName: string) => {
    cy.get('form[name="form"]').should("be.visible");
    cy.get("#input-name").type(projectName);
  },

  clickCreateButton: () => {
    cy.get("#confirm-action").click();
  },

  createNewProject: (projectName: string) => {
    cy.byLegacyTestID("namespace-bar-dropdown").find("button").eq(0).click();
    cy.byLegacyTestID("dropdown-text-filter").type(projectName);
    cy.get('[role="listbox"]', { timeout: 5000 }).then(($el) => {
      if ($el.find('li[role="option"]').length === 0) {
        cy.byTestDropDownMenu("#CREATE_RESOURCE_ACTION#").click();
        projectNameSpace.enterProjectName(projectName);
        projectNameSpace.clickCreateButton();
      }
    });
  },
  selectOrCreateProject: (projectName: string) => {
    cy.byLegacyTestID("namespace-bar-dropdown").find("button").eq(0).click();
    cy.byLegacyTestID("dropdown-text-filter").type(projectName);
    cy.get('[role="listbox"]').then(($el) => {
      if ($el.find('li[role="option"]').length === 0) {
        cy.byTestDropDownMenu("#CREATE_RESOURCE_ACTION#").click();
        projectNameSpace.enterProjectName(projectName);
        projectNameSpace.clickCreateButton();
      } else {
        cy.get(`[id="${projectName}-link"]`).click();
      }
    });
  },

  selectProject: (projectName: string) => {
    cy.byLegacyTestID("namespace-bar-dropdown").find("button").eq(0).click();
    cy.byLegacyTestID("dropdown-text-filter").type(projectName);
    cy.get(`[id="${projectName}-link"]`).click();
  },

  verifyPopupClosed: () => {
    cy.get('form[name="form"]').should("not.be.visible");
  },

  verifyMessage: (message: string) => {
    cy.get("h2").should("contain.text", message);
  },

  deleteProjectNameSpace: (project: string) => {
    cy.exec(`oc delete project ${project}`);
  },
};
