Feature: Perform actions on knative revision
   As a user, I want to perform edit or delete operations on knative revision in topology page

   Background:
      Given user has installed OpenShift Serverless Operator
      And user is at developer perspective
      And user has selected namespace "aut-knative-actions-revision"
      And user has created knative service "nodejs-ex-git"

   @regression
   Scenario: Context menu for knative Revision: Kn-03-TC01
      Given user is at Topology page
      When user right clicks on the revision of knative service "nodejs-ex-git" to open the context menu
      Then user is able to see Edit Labels, Edit Annotations, Edit Revision, Delete Revision options in context menu


   @regression
   Scenario: Edit labels modal details : Kn-03-TC02
      Given user is at Topology page
      When user right clicks on the revision of knative service "nodejs-ex-git" to open the context menu
      And user selects "Edit Labels" option from knative revision context menu
      Then modal with "Edit labels" appears
      And save button is displayed


   @regression
   Scenario: Add new label to knative Revision: Kn-03-TC03
      Given user is at Topology page
      When user right clicks on the revision of knative service "nodejs-ex-git" to open the context menu
      And user selects "Edit Labels" option from knative revision context menu
      And user adds the label "app=label" to existing labels list in Edit Labels modal
      And user clicks the save button on the "Edit labels" modal
      Then user can see the label "app=label" in the Details tab of the Sidebar of "nodejs-ex-git"


   @regression
   Scenario: Remove label from knative Revision: Kn-03-TC04
      Given user is at Topology page
      And user added label "app=label" to the revision of knative service "nodejs-ex-git"
      When user right clicks on the revision of knative service "nodejs-ex-git" to open the context menu
      And user selects "Edit Labels" option from knative revision context menu
      And user removes the label "app=label" from existing labels list in Edit Labels modal
      And user clicks the save button on the "Edit labels" modal
      Then user will not see the label "app=label" in "nodejs-ex-git" service side bar details


   @regression
   Scenario: Add labels to existing labels list and cancel the activity : Kn-03-TC05
      Given user is at Topology page
      When user right clicks on the revision of knative service "nodejs-ex-git" to open the context menu
      And user selects "Edit Labels" option from knative revision context menu
      And user adds the label "app=label" to existing labels list in Edit Labels modal
      And user clicks cancel button on the "Edit labels" modal
      Then user will not see the label "app=label" in "nodejs-ex-git" service side bar details


   @regression
   Scenario: Edit Annotation modal details : Kn-03-TC06
      Given user is at Topology page
      When user right clicks on the revision of knative service "nodejs-ex-git" to open the context menu
      And user selects "Edit Annotations" option from knative revision context menu
      Then modal with "Edit annotations" appears
      And key, value columns are displayed with respecitve text fields
      And Add more link is enabled
      And save, cancel buttons are displayed


   @regression
   Scenario: Add annotation to the existing annonations list : Kn-03-TC07
      Given user is at Topology page
      And number of annotations are "5" present in revision side bar details of service "nodejs-ex-git"
      When user right clicks on the revision of knative service "nodejs-ex-git" to open the context menu
      And user selects "Edit Annotations" option from knative revision context menu
      And user clicks Add button on the Edit Annotations modal
      And user enters annotation key as "serving.knative.dev/creator"
      And user enters annotation value as "kube:admin"
      And user clicks the save button on the "Edit annotations" modal
      Then number of Annotations increased to "6" in revision side bar details of service "nodejs-ex-git"


   @regression
   Scenario: perform cancel action on Edit Annotations : Kn-03-TC09
      Given user is at Topology page
      And number of annotations are "6" present in side bar - details tab- annotation section
      When user right clicks on the revision of knative service "nodejs-ex-git" to open the context menu
      And user selects "Edit Annotations" option from knative revision context menu
      And user clicks on remove icon for the annotation with key "serving.knative.dev/creator" present in "Edit annotations" modal
      And user clicks cancel button on the "Edit annotations" modal
      Then verify the number of Annotations equal to "6" in side bar details


   Scenario: Remove annotation from existing annonations list : Kn-03-TC08
      Given user is at Topology page
      And number of annotations are "6" present in side bar - details tab
      When user right clicks on the revision of knative service "nodejs-ex-git" to open the context menu
      And user selects "Edit Annotations" option from knative revision context menu
      And user clicks on remove icon for the annotation with key "serving.knative.dev/creator" present in "Edit annotations" modal
      And user clicks the save button on the "Edit annotations" modal
      Then verify the number of Annotations decreased to "5" in side bar details


   @regression, @manual
   Scenario: Edit revision details page : Kn-03-TC10
      Given user is at Topology page
      When user right clicks on the revision of knative service "nodejs-ex-git" to open the context menu
      And user selects "Edit Revision" option from knative revision context menu
      And user clicks on Details tab
      Then details tab displayed with Revision Details and Conditions sections
      And Revision details contains fields like Name, Namespace, Labels, Annotations, Created At, Owner


   @smoke, @manual
   Scenario: Update the revision detials : Kn-03-TC11
      Given user is at Topology page
      When user right clicks on the revision of knative service "nodejs-ex-git" to open the context menu
      And user selects "Edit Revision" option from knative revision context menu
      And user modifies the Yaml file of the Revision details page
      And user clicks save button on Revision Yaml page
      Then the message display as "{revision name} has been updated to version {nnnnnn}"
      And another message display as "This object has been updated."


   @regression
   Scenario: Delete revision modal details for service with multiple revisions : Kn-03-TC13
      Given user is at Topology page
      And service should contain multiple revisions
      When user right clicks on the revision of knative service "nodejs-ex-git" to open the context menu
      And user selects "Delete Revision" option from knative revision context menu
      Then modal with "Unable to delete Revision" appears
      And modal should get closed on clicking OK button


   @regression
   Scenario: Delete revision for the service which contains multiple revisions : Kn-03-TC14
      Given user is at Topology page
      And service should contain multiple revisions
      When user right clicks on the revision of knative service "nodejs-ex-git" to open the context menu
      And user selects "Delete Revision" option from knative revision context menu
      Then modal with "Update the traffic distribution among the remaining Revisions" appears
      And modal should get closed on clicking OK button


   @smoke
   Scenario: Delete Revision not possible for the service which contains one revision : Kn-03-TC12
      Given user is at Topology page
      When user right clicks on the revision of knative service "nodejs-ex-git" to open the context menu
      And user selects "Delete Revision" option from knative revision context menu
      Then modal with "Unable to delete Revision" appears
      And modal contains message as "You cannot delete the last Revision for the Service."
      And modal should get closed on clicking OK button
