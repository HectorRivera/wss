**WSS Server**

The WSS project is a POC to demonstrate standing up a WS server via NodeJS. The WSS server will listen on a specific port and mange the connection state for multiple clients. In this version both web clients ausing the url: http://localhost:8765/ and the React App: http://localhost:3000/rtmodel was used to subscribe and post WS messages.

The browser version uses a native support for WS while
the REACT app uses the library: react-use-websocket
Additionally theres a CLI testing tool WSCAT that can be invoked with the following
wscat -c ws://localhost:3030
Once it is running you can pass an standard array/object
["{t3:'Hello'}"]
["{t3:'XYZ',t4:'BBB'}"]

The ws server listening on port 3030, parses the request and pushed it out to all the subscribers.
