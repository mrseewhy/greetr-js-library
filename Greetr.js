(function(global, $) {
  //"new" an object
  var Greetr = function(firstname, lastname, language) {
    return new Greetr.init(firstname, lastname, language);
  };
  //hidden within the scope of the IIFE and never directly accessible
  var supportedLangs = ["en", "es"];

  //informal greetings
  var greetings = {
    en: "Hello",
    es: "Hola"
  };
  //formal greetings
  var formalGreetings = {
    en: "Greetings",
    es: "Saludos"
  };
  //logger messages
  var logMessages = {
    en: "Logged in",
    es: "Inicio sesion"
  };
  //prototype that carries the methods
  Greetr.prototype = {
    fullname: function() {
      return this.firstname + " " + this.lastname;
    },
    //validate
    validate: function() {
      if (supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid Language";
      }
    },
    greeting: function() {
      return greetings[this.language] + " " + this.firstname;
    },
    formalGreeting: function() {
      return formalGreetings[this.language] + " " + this.fullname();
    },
    greet: function(formal) {
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }
      if (console) {
        console.log(msg);
      }
      //this refers to the calling object at execution time
      //return this makes the method chainable
      return this;
    },
    log: function() {
      if (console) {
        console.log(logMessages[this.language] + ": " + this.fullname());
      }
      return this;
    },
    //set language
    setLang: function(lang) {
      this.language = lang;
      this.validate();
      return this;
    },

    //Add
    HTMLGreeting: function(selector, formal) {
      if (!$) {
        throw "jQuery not loaded";
      }
      if (!selector) {
        throw "missing jQuery Selector";
      }
      //determine the msg
      var msg;
      if (formal) {
        msg = this.formalGreeting();
      }
      $(selector).html(msg);
      return this;
    }
  };
  //Greetr initialization function
  Greetr.init = function(firstname, lastname, language) {
    var self = this;
    self.firstname = firstname || "";
    self.lastname = lastname || "";
    self.language = language || "en";

    self.validate();
  };

  Greetr.init.prototype = Greetr.prototype;

  global.Greetr = global.G$ = Greetr;
})(window, jQuery);
