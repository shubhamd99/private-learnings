// Chain of Responsibility — Core Idea
// A request is passed through a chain of handlers.
// Each handler:
// Either handles the request
// Or forwards it to the next handler
// The sender does not know who will handle it.

// Handler = Abstract/Base class that defines the contract for all handlers in the chain
// Responsibilities:  Holds reference to the next handler
// Defines:
// setNext() → to build the chain
// handleRequest() → default forwarding behavior

// Concrete Handler = Actual implementation that can process a request
// Responsibilities: Decides: “Can I handle this request?”
// If: Yes → handle it
// No → forward to next handler

// The Chain of Responsibility pattern is a behavioural design pattern that allows an object
// to pass a request along a chain of potential handlers until one of the handlers processes the request.
// This pattern decouples the sender and receiver of the request, providing flexibility in how requests are handled.

// Purpose:
// To avoid coupling the sender of a request to its receiver by giving multiple objects a chance to handle the request.

// Components:
// Handler: Defines an interface for handling requests and optionally forwarding them to the next handler in the chain.
// Concrete Handlers: Implement the handler interface and handle requests they are responsible for.
// They can forward requests to the next handler if they can't process them.
// Client: Initiates the request and sends it to the first handler in the chain.

// Scenario 1:
// Consider a customer support system where different support levels
// (like front-line support, supervisor, and manager) can handle different types of requests.

// Abstract Handler
class Handler {
  constructor() {
    this.nextHandler = null;
  }
  setNext(handler) {
    this.nextHandler = handler;
    return handler;
  }
  handleRequest(request) {
    if (this.nextHandler) {
      return this.nextHandler.handleRequest(request);
    }
    return null;
  }
}

// Concrete Handlers
class FrontLineSupport extends Handler {
  handleRequest(request) {
    if (request.type === "simple") {
      return `FrontLineSupport handled request: ${request.content}`;
    }
    return super.handleRequest(request);
  }
}

class SupervisorSupport extends Handler {
  handleRequest(request) {
    if (request.type === "intermediate") {
      return `SupervisorSupport handled request: ${request.content}`;
    }
    return super.handleRequest(request);
  }
}

class ManagerSupport extends Handler {
  handleRequest(request) {
    if (request.type === "complex") {
      return `ManagerSupport handled request: ${request.content}`;
    }
    return super.handleRequest(request);
  }
}

// Client Code
const frontLine = new FrontLineSupport();
const supervisor = new SupervisorSupport();
const manager = new ManagerSupport();
frontLine.setNext(supervisor).setNext(manager);

const requests = [
  {
    type: "simple",
    content: "Password reset",
  },
  {
    type: "intermediate",
    content: "Software installation",
  },
  {
    type: "complex",
    content: "Server outage",
  },
];

requests.forEach((request) => {
  const response = frontLine.handleRequest(request);
  console.log(response);
});

// Scenario 2:
// Let’s implement a system for processing different types of documents
// (like text documents, spreadsheets, and presentations) that might require various levels of processing
// (basic validation, in-depth analysis, and final approval).

// Abstract Handler
class DocumentHandler {
  constructor() {
    this.nextHandler = null;
  }
  setNext(handler) {
    this.nextHandler = handler;
    return handler;
  }
  handleRequest(document) {
    if (this.nextHandler) {
      return this.nextHandler.handleRequest(document);
    }
    return null;
  }
}

// Concrete Handlers
class BasicValidationHandler extends DocumentHandler {
  handleRequest(document) {
    if (document.isValid()) {
      console.log(
        `BasicValidationHandler: ${document.name} passed basic validation.`
      );
      return super.handleRequest(document);
    } else {
      return `BasicValidationHandler: ${document.name} failed basic validation.`;
    }
  }
}

class InDepthAnalysisHandler extends DocumentHandler {
  handleRequest(document) {
    if (document.needsAnalysis()) {
      console.log(
        `InDepthAnalysisHandler: ${document.name} is being analyzed.`
      );
      document.analyze();
      return super.handleRequest(document);
    } else {
      return `InDepthAnalysisHandler: ${document.name} does not need in-depth
analysis.`;
    }
  }
}

class ApprovalHandler extends DocumentHandler {
  handleRequest(document) {
    if (document.isApproved()) {
      return `ApprovalHandler: ${document.name} has already been approved.`;
    } else {
      console.log(`ApprovalHandler: ${document.name} is pending approval.`);
      document.approve();
      return `ApprovalHandler: ${document.name} has been approved.`;
    }
  }
}

// Document class to simulate different types of documents
class Document {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.valid = true;
    this.analyzed = false;
    this.approved = false;
  }
  isValid() {
    return this.valid;
  }
  needsAnalysis() {
    return !this.analyzed;
  }
  analyze() {
    this.analyzed = true;
  }
  isApproved() {
    return this.approved;
  }
  approve() {
    this.approved = true;
  }
}

// Client Code
const basicValidation = new BasicValidationHandler();
const inDepthAnalysis = new InDepthAnalysisHandler();
const approval = new ApprovalHandler();
basicValidation.setNext(inDepthAnalysis).setNext(approval);

const documents = [
  new Document("Document1", "text"),
  new Document("Document2", "spreadsheet"),
  new Document("Document3", "presentation"),
];

documents.forEach((document) => {
  const response = basicValidation.handleRequest(document);
  console.log(response);
});

// The BasicValidationHandler ensures that the document passes basic validation.
// If it does, it forwards the request to the next handler.
// The InDepthAnalysisHandler performs a detailed analysis on the document if required
// and then passes the request along. The ApprovalHandler checks if the document is already approved;
// if not, it approves the document.

// In the client code, we create instances of these handlers and link them together using the setNext method.

// This complex implementation demonstrates how the Chain of Responsibility pattern
// can be used to handle more sophisticated workflows involving multiple processing steps.
