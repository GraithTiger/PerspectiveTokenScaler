export class PerspectiveTokenScaler {

    static handleUpdate(token, change) {
        if (token instanceof TokenDocument && (change.x || change.y)) {
            let currentScene = game.scenes.viewed
            let starterData = currentScene.drawings.filter(d => d.text === 'scaler_start')?.[0]
            let limiterData = currentScene.drawings.filter(d => d.text === 'scaler_limit')?.[0]

            if (typeof starterData !== 'undefined' && typeof limiterData !== 'undefined') {
                let xDiffMax = limiterData.x - starterData.x
                let yDiffMax = limiterData.y - starterData.y
                let maxDistance = Math.sqrt(xDiffMax * xDiffMax + yDiffMax * yDiffMax)

                let xDiffCurrent = limiterData.x - (change.x ? change.x : 0)
                let yDiffCurrent = limiterData.y - (change.y ? change.y : 0)
                let xDiffOld = limiterData.x - (token.x ? token.x : starterData.x)
                let yDiffOld = limiterData.y - (token.y ? token.y : starterData.x)

                let distance = Math.sqrt(xDiffCurrent * xDiffCurrent + yDiffCurrent * yDiffCurrent)
                let distanceOld = Math.sqrt(xDiffOld * xDiffOld + yDiffOld * yDiffOld)

                let factorNew = distance > maxDistance ? 1 : distance / maxDistance
                factorNew = factorNew < 0.25 ? 0.25 : factorNew
                let factorOld = distanceOld > maxDistance ? 1 : distanceOld / maxDistance
                factorOld = factorOld < 0.25 ? 0.25 : factorOld

                let factor = factorNew/factorOld

                change.texture = {
                    'scaleX' : token.texture.scaleX * factor,
                    'scaleY' : token.texture.scaleY * factor
                }
            }
        }
    }
}
