
/*
 * Copyright (c) Aista Ltd, and Thomas Hansen - For license inquiries you can contact thomas@ainiro.io.
 */

// Angular and system imports.
import { Injectable } from '@angular/core';

// Application specific imports.
import { HttpService } from 'src/app/_general/services/http.service';
import { MagicResponse } from '../models/magic-response.model';
import { PromptResponse } from '../models/prompt-response.model';

/**
 * OpenAI model.
 */
export class OpenAIModel {
  id: string;
  created?: number;
  owned_by?: string;
  parent?: string;
}

/**
 * OpenAI service, allowing user to interact with OpenAI.
 */
@Injectable({
  providedIn: 'root'
})
export class OpenAIService {

  constructor(private httpService: HttpService) { }

  /**
   * Queries OpenAI with the specified prompt and returns result to caller.
   */
  query(prompt: string, type: string, search: boolean = false, session: string = null, model: string = null) {

    let query =
      `/magic/system/openai/${model?.startsWith('gpt-') ? 'chat' : 'prompt'}?prompt=` +
      encodeURIComponent(prompt) +
      '&references=' + (search ? 'true' : 'false') +
      '&type=' + encodeURIComponent(type);
    if (session) {
      query += '&session=' + encodeURIComponent(session)
    }
    return this.httpService.get<PromptResponse>(query);
  }

  /**
   * Returns true if OpenAI has been configured.
   */
  isConfigured() {

    return this.httpService.get<{ result: boolean }>('/magic/system/openai/is-configured');
  }

  /**
   * Returns OpenAI API key to caller.
   */
  key() {

    return this.httpService.get<any>('/magic/system/openai/key');
  }

  /**
   * Saves the specified OpenAI API key.
   */
  setKey(key: string) {

    return this.httpService.post<any>('/magic/system/openai/key', {
      key,
    });
  }

  /**
   * Returns all models from OpenAI, including fine tuned models and base models.
   */
  models(api_key: string = null) {

    let query = '';
    if (api_key) {
      query += '?api_key=' + encodeURIComponent(api_key);
    }
    return this.httpService.get<OpenAIModel[]>('/magic/system/openai/models' + query);
  }

  /**
   * Returns all themes from backend.
   */
  themes() {

    return this.httpService.get<string[]>('/magic/system/openai/themes');
  }

  /**
   * Returns all themes for search from backend.
   */
  themesSearch() {

    return this.httpService.get<string[]>('/magic/system/openai/themes-search');
  }

  /**
   * Uploads the specified training data file to the backend.
   */
  uploadTrainingFile(data: FormData) {

    return this.httpService.post<any>('/magic/system/openai/upload-training-data', data);
  }

  /**
   * Uploads training data to OpenAI and starts a new training session.
   */
  start_training(data: any) {

    return this.httpService.post<MagicResponse>('/magic/system/openai/train', data);
  }

  /**
   * Imports the specified URL as training data.
   */
  importUrl(url: string, type: string, delay: number, max: number, threshold: number, summarize: boolean) {

    return this.httpService.post<any>('/magic/system/openai/import-url', {
      url,
      type,
      delay,
      max,
      threshold,
      summarize,
    });
  }

  /**
   * Imports the specified page as training data.
   */
  importPage(url: string, type: string, threshold: number) {

    return this.httpService.post<any>('/magic/system/openai/import-page', {
      url,
      type,
      threshold,
    });
  }

  /**
   * Vectorises all snippets in the specified type.
   */
  vectorise(type: string) {

    return this.httpService.post<any>('/magic/system/openai/vectorise', {
      type,
    });
  }

  /**
   * Vectorises only the specified snippet.
   */
  vectoriseSnippet(id: number) {

    return this.httpService.post<any>('/magic/system/openai/vectorise-snippet', {
      id,
    });
  }

  /**
   * Creates a new bot 100% automatically from the specified URL.
   */
  createBot(url: string, model: String, flavor: string = null, max: number = null, autocrawl: boolean = null) {

    const args: any = {
      url: url,
      model: model,
    };
    if (flavor) {
      args.flavor = flavor;
    }
    if (max) {
      args.max = max;
    }
    if (autocrawl) {
      args.autocrawl = autocrawl;
    }
    return this.httpService.post<any>('/magic/system/openai/create-bot', args);
  }
}
