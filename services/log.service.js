import chalk from 'chalk';
import dedent from 'dedent';

const printError = (error) => {
    console.log(chalk.bgRed( 'ERROR' ) + ' ' + error);
}

const printSuccess = (msg) => {
    console.log(chalk.bgGreen( 'SUCCESS' ) + ' ' + msg);
}

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan('HELP')}
        no parm - log weather
        -s [CITY] city setting
        -h log help
        -t [API_KEY] for token save
        `
    )
}

export { printError, printSuccess, printHelp };