/* tslint:disable */
import {Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { WrappedPost, Post, ErrorResponse } from './models';
import 'rxjs/Rx';


@Injectable()
/**
 * Created with angular2-swagger-client-generator v
 */
export class ApiClientService {
	domain:string;

  constructor(public http: Http){
    this.domain = 'http://localhost:8080/api';
  }
  /*
	constructor(public http: Http, options?: any) {
		var domain = (typeof options === 'object') ? options.domain : options;
		this.domain = typeof(domain) === 'string' ? domain : 'http://localhost:8080/api';

		if(this.domain.length === 0) {
			throw new Error('Domain parameter must be specified as a string.');
		}

	}
  */


	/**
  *
	* @method
	* @name findPost
	* @param {string} id - The id of the post
	*
	*/
	public findPost(id: string) {
		let payload = {};
		let queryParameters = {};
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');


		let uri = `/posts/${id}`;

		return this.http
			.get(this.domain + uri, { headers: headers, params: queryParameters })
			.map((res: Response) => {
        return res;
      });
	}

	/**
  *
	* @method
	* @name updatePost
	* @param {string} id - The id of the post
	* @param {WrappedPost} postN -
	*
	*/
	public updatePost(id: string, post: WrappedPost) {
		let payload = {};
		let queryParameters = {};
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');



		payload['post'] = post;
		let uri = `/posts/${id}`;

		return this.http
			.put(this.domain + uri, JSON.stringify(post), { headers: headers, params: queryParameters })
			.map((res: Response) => {
        return res;
      });
	}

	/**
  *
	* @method
	* @name deletePost
	* @param {string} id - The id of the post
	*
	*/
	public deletePost(id: string) {
		let payload = {};
		let queryParameters = {};
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');


		let uri = `/posts/${id}`;

		return this.http
			.delete(this.domain + uri, { headers: headers, params: queryParameters })
			.map((res: Response) => {
        return res;
      });
	}

	/**
  *
	* @method
	* @name createPost
	* @param {WrappedPost} post -
	*
	*/
	public createPost(post: WrappedPost) {
		let payload = {};
		let queryParameters = {};
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');


		payload['post'] = post;
		let uri = `/posts`;

		return this.http
			.post(this.domain + uri, JSON.stringify(post), { headers: headers, params: queryParameters })
			.map((res: Response) => {
        return res;
      });
	}

	/**
  *
	* @method
	* @name filterPosts
	*
	*/
	public filterPosts() {
		let payload = {};
		let queryParameters = {};
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let uri = `/posts`;

		return this.http
			.get(this.domain + uri, { headers: headers, params: queryParameters })
			.map((res: Response) => {
        return res;
      });
	}

	/**
  *
	* @method
	* @name inboxPosts
	*
	*/
	public inboxPosts() {
		let payload = {};
		let queryParameters = {};
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let uri = `/inbox`;

		return this.http
			.get(this.domain + uri, { headers: headers, params: queryParameters })
			.map((res: Response) => {
        return res;
      });
	}


}
