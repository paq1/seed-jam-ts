import {GameComponent} from "./app/game.component.js";

let gameComponent = new GameComponent();
gameComponent.init();

requestAnimationFrame(gameComponent.run.bind(gameComponent));