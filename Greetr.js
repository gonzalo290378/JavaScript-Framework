(function (global, $) {
  // PASO 1) IIFFE

  var Greetr = function (firstName, lastName, language) {
    //PASO 2) PATRON DE DISENO
    return new Greetr.init(firstName, lastName, language);
  };
  //PASO 3) RETURNS A SEPARATE FUNCTION CONSTRUCTOR CON ESTO LOGRO QUE DESPUES NO SE VUELVA A CREAR OTRO OBJETO
  //NUEVO LLAMANDO AL "NEW", SIMPLEMENTE LO QUE HAGO ES LLAMAR A GREETR(FIRSTNAME, LASNAME, LANGUAGE).
  //ES CLARO Y PUNTO. ES COMO UN PATRON DE DISENO.

  /////////////////////////// 1 OBJETO GIGANTE CON TODOS LOS METODOS DEFINIENDOLO
  //PASO 4) AQUI ARMO EL OBJETO DONDE ESTAN LOS METODOS Y PROPIEDADES DEL OBJETO DONDE LOS ELEMENTOS DEL CONSTRUCTOR
  //CMO FIRSTNAME, LASTNAME Y LANGUAGE VAN A TENER ACCESO A SU PROTOTIPO.

  Greetr.prototype = {
    fullName: function () {
      return this.firstName + " " + this.lastName;
    },

    validate: function () {
      if (supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid Lang";
      }
    },

    greeting: function () {
      return greetings[this.language] + " " + this.firstName + "!";
    },

    formalGreeting: function () {
      return formalGreetings[this.language] + " " + this.fullName();
    },

    greet: function (formal) {
      var msg;

      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      if (console) {
        console.log(msg);
      }

      return this; //CHAINABLE: ENCADENABLE. 'THIS REFERS TO THE CALLING OBJECT AT EXECUTION TIME MAKES THE METHOD CHAINABLE
    },

    logFunction: function () {
      if (console) {
        console.log(logMessages[this.language] + ": " + this.fullName());
      }

      return this;
    },

    setLang: function (lang) {
      this.language = lang;

      this.validate();

      return this;
    },

    HTMLGreeting: function (selector, formal) {
      if (!$) {
        throw "jQuery not loaded";
      }

      if (!selector) {
        throw "Missing jQuery selector";
      }

      var msg;
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      $(selector).html(msg);
      return this;
    },
  };

  ///////////////////////////

  //ESTOS 4 OBJETOS SIGUIENTES NO SON COMO EL ANTERIOR (UN ARRAY) PORQUE LOS QUIERO REFERENCIAR POR EL NOMBRE DE
  //LA PROPIEDAD PARA HACERLO DINAMICO.

  var supportedLangs = ["en", "es", "pr"]; //NO ES EXPUESTO, ESTA DENTRO DEL SCOPE

  var greetings = {
    //NO ES EXPUESTO, ESTA DENTRO DEL SCOPE
    en: "Hello",
    es: "Hola",
    pr: "Oi",
  };

  var formalGreetings = {
    //NO ES EXPUESTO, ESTA DENTRO DEL SCOPE
    en: "Greetings",
    es: "Saludos",
    pr: "Saudações",
  };

  var logMessages = {
    //NO ES EXPUESTO, ESTA DENTRO DEL SCOPE
    en: "Loggin in",
    es: "Inicio Sesion",
    pr: "Conecte-se",
  };

  //CONSTRUCTOR
  Greetr.init = function (firstName, lastName, language) {
    var self = this;
    this.firstName = firstName || "";
    this.lastName = lastName || "";
    this.language = language || "en";
    self.validate();
  };

  Greetr.init.prototype = Greetr.prototype; //PASO 5) Y TE PREGUNTARAS PORQUE EN EL PROTOTYPE NO INVOCO A UN
  // METODO, PERO ESE NO ES EL OBJETIVO, SI NO, DE QUE GREETR.INIT.PROTOTYPE Y  GREETR.PROTOTYPE APUNTEN AL MISMO
  //LUGAR.

  global.Gonzalo$ = Greetr; // PASO 5) Y APUNTO AL GLOBAL, DONDE TANTO GREETR COMO G$ APUNTAN AL CONSTRUCTOR
})(window, jQuery);
