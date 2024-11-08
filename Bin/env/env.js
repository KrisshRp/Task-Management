const dotenv = require("dotenv");
const jwt = require("../../Bin/config/jwt");

class Env {
    dotEnvDefault = ".env";
    dotEnvDevelopment = "/Bin/env/.env.development";
    dotEnvProduction = "/Bin/.env.production";

    constructor() {
        this.init();
        this.viewenv();
    }

    init() {
        dotenv.config({path: this.dotEnvDefault});
        const environment = this.getEnvironment();
        const envFile = this.getEnvFile(environment);
        dotenv.config({path: process.cwd() + envFile});
        process.env["jwtToken"] = jwt.jwtToken;
        process.env["expiresIn"] = jwt.expiresIn;
        process.env["algorithm"] = jwt.algorithm;
        process.env["jwtTokenName"] = jwt.jwtTokenName;
    }

    getEnvFile(environment) {
        switch (environment) {
            case "development":
                return this.dotEnvDevelopment;
            case "production":
                return this.dotEnvProduction;
        }
    }

    getEnvironmentVariable(variable) {
        return process.env[variable];
    }

    getEnvironment() {
        return this.getEnvironmentVariable("NODE_ENV");
    }

    isDevelopment() {
        return this.getEnvironment() === "development";
    }

    isProduction() {
        return this.getEnvironment() === "production";
    }

    viewenv() {
        console.log(`[${process.env.PROJECT_NAME} : ${process.env.PORT}] ${this.getEnvironment()} env working on`);
    }
}

exports.env = new Env();
