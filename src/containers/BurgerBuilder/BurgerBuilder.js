import React from 'react'

import Aux from '../../hoc/Hux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7 
}

class BurgerBuilder extends React.Component{
    
    state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0  
        },
        totalPrice: 4,
        purchaseable: false
    }
 //this function run just when we update (addIngredientHandler or removeIngredientHandler) never pass it to buildcontrolls jsst we pass purchaseable
    updatePurchaseState  (ingredients) {
        
        const sum = Object.keys(ingredients)
                    .map((ingredientKey)=> {
                      return ingredients[ingredientKey]  
                    })
                    .reduce((sum,el) => {
                        return sum + el
                    } , 0)
                    this.setState({purchaseable: sum > 0})
    }


    addIngredientHandler=(type)=>{
         const oldCount=this.state.ingredients[type]  
         const updateCount=oldCount + 1
         const updateIngredients={...this.state.ingredients}

         updateIngredients[type] = updateCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldprice=this.state.totalPrice
        const newPrice = oldprice + priceAddition
        this.setState({totalPrice: newPrice,ingredients: updateIngredients})
        this.updatePurchaseState(updateIngredients)
    }


    removeIngredientHandler=(type)=>{

       
        const oldCount=this.state.ingredients[type]  
              if(oldCount<=0){
                return;
              }
            const updateCount= oldCount - 1
                // ceate a copy from the orginal object this.state.ingredients 
            const updateIngredients={...this.state.ingredients}

            updateIngredients[type] = updateCount
            const priceDeduction = INGREDIENT_PRICES[type]
            const oldprice=this.state.totalPrice
            const newPrice = oldprice - priceDeduction
            this.setState({totalPrice: newPrice,ingredients: updateIngredients})
            this.updatePurchaseState(updateIngredients)
        
    }


    render(){
        // {salad: true, meat: false, ......}
        const disabledInfo = {...this.state.ingredients}

        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key] <= 0
        }

        console.log(disabledInfo)
        return (
            <Aux>
                <Burger  ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientremoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchaseable={this.state.purchaseable}
                    price={this.state.totalPrice}
                />
            </Aux>
        )
    }
}
// ingredients is not same the prop in state it sjus name for prop to pass it

export default BurgerBuilder
