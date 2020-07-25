// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { registerElement } from "nativescript-angular/element-registry";
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app/app.module";

registerElement("PullToRefresh", () => require("@nstudio/nativescript-pulltorefresh").PullToRefresh);
platformNativeScriptDynamic().bootstrapModule(AppModule);
