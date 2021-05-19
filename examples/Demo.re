// %raw
// {|require('isomorphic-fetch')|};
/**
 * Opaque type for the window
 */
type window;
Js.log(Js.Promise.resolve("http://httpbin.org/"))
Js.log(("http://httpbin.org/"))

type response('a) = {body: 'a};
type options = {responseType: string};
type person = {
  name: string,
  homeworld: string,
};
[@bs.module]
external got: (string, options) => Js.Promise.t(response('a)) = "got";

let getPerson: Js.Promise.t(person) = {
  got("https://swapi.co/api/people/1", {responseType: "json"})
  |> Js.Promise.then_(response => Js.Promise.resolve(response.body));
};

Js.Promise.resolve(getPerson)
|> Js.Promise.then_(( response) => Js.Promise.resolve(Js.log(response)));
/**
 * window fields
 */
[@bs.val] external window: window = "window";
let dominantColors = Dominant.ofUrl("http://httpbin.org/",())
// Js.log(Js.Promise.resolve(dominantColors()))
dominantColors
|>Js.Promise.then_(
  value => Js.Promise.resolve(Js.log(value)),
)|>ignore

// open Refetch;
// open Resync;
// [%%raw {|require('isomorphic-fetch')|}];

// [@bs.module] external stringifyPng : Node.buffer => ((exn, string) => unit) => unit = "console-png";
// [@bs.module] external streamToBuffer : Fetch.readableStream => ((exn, Node.buffer) => unit) => unit = "stream-to-buffer";

// get("http://httpbin.org/image/png")
// |> Future.map(
//     fun | Response.Ok(_, response)      => Response.body(response)
//         | Response.Error({ reason }, _) => failwith(reason))

// |> Future.whenCompleted(
//    fun | Ok(stream) =>
//          streamToBuffer(stream, (_, buffer) =>
//            stringifyPng(buffer, (_, string) => Js.log(string)))
//        | Error(e)   => Js.log(e)
// );
