import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { config } from '@fortawesome/fontawesome-svg-core';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
config.autoReplaceSvg = false;