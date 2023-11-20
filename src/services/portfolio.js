
import porfolioRepository from '../models/portfolio.js';




const getPortfolioUserById = async (userId) => {
    try {
        let portfolio = await porfolioRepository.findById({ user: userId });
        console.log(portfolio)
        return portfolio;
    } catch (err) {
        console.log(err.message);
        return { err };
    }

}
const getPortfolioByType = async (userId, currency) => {
    try {
        let portfolio = await porfolioRepository.find({ user: userId, currency });
        console.log(portfolio)
        return portfolio;
    } catch (err) {
        console.log(err.message);
        return { err };
    }

}



const createPortfolio = async (portfolioData) => {

    const portfolio = new porfolioRepository(portfolioData);


    try {
        let portfolioSaved = await portfolio.save();
        console.log(portfolioSaved)
        return portfolioSaved;

    } catch (err) {
        console.log(err.message)
        if (err) return { err };
    }

}



// const updatePortfolio = async (type, userData, updateParam) => {
//     let result;

//     try {
//         if (type === 'buy') {
//             result = await portfolioRepository.findByIdAndUpdate(userData, { value: updateParam })
//         }
//         if (type === 'sell') {
//             result = await portfolioRepository.findByIdAndUpdate(userData, { value: updateParam })
//         }
//
//         return result;
//     } catch (err) {
//         console.log(err.message)
//         return { err };
//     }
// }

export {
    getPortfolioUserById,
    // updatePortfolio,
    createPortfolio,
    getPortfolioByType,

}