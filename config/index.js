const app = {
    name: process.env.SERVICE_NAME,
    code: process.env.APP_CODE,
};

const logger = {
    level: process.env.LOG_LEVEL,
    verbose: true,
    asyncLogging: false,
    name: app.name,
};

const buildInfo = {
    build: process.env.BUILD_TAG,
    commit: process.env.GIT_COMMIT,
    branch: process.env.GIT_BRANCH,
};

module.exports = {
    stage: process.env.STAGE,
    region: process.env.REGION,
    app,
    buildInfo,
    logger
}