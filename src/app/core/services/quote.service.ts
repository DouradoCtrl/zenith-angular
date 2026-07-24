import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Quote {
  id: number;
  quote: string;
  author: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private http = inject(HttpClient);
  
  // Endpoint from DummyJSON
  private readonly QUOTE_API = 'https://dummyjson.com/quotes/random';

  /**
   * Fetches a random motivational quote.
   * If the HTTP request fails, returns a fallback quote.
   */
  getRandomQuote(): Observable<Quote> {
    return this.http.get<Quote>(this.QUOTE_API).pipe(
      catchError(() => {
        // Fallback in case of API error or offline status
        return of({
          id: 0,
          quote: "A persistência é o caminho do êxito.",
          author: "Charles Chaplin"
        });
      })
    );
  }
}
