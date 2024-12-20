import {SceneModel} from "./models/scene.model";
import {SceneBehavior} from "./scene.behavior";

export interface Scene extends SceneBehavior, SceneModel {}