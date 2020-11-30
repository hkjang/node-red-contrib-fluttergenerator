node-red-contrib-fluttergenerator
========================

<a href="http://nodered.org" target="_new">Node-RED</a> 

<a href="https://www.npmjs.com/package/flutter-generator" target="_new">Inspired by flutter-generator</a>.

Install
-------

Run the following command in the root directory of your Node-RED install:

    npm install node-red-contrib-fluttergenerator --save

Usage
-----

# flutter generator  
- Check the files under the template folder of node-red-contrib-fluttergenerator
- bloc, router, stateful-page, stateless-page
- To change the template, simply change the dart file under the template folder directory.

## sample parameters
```javascript
msg.resourceType = 'stateful-page';
msg.resourceType = 'stateless-page';
msg.resourceType = 'router';
msg.resourceType = 'bloc';

msg.componentName = 'test';
// for windows
msg.destination = 'D:\\project\\app\\lib\\pages';
// for linux or macos
// msg.destination = '/app/project/lib/pages';
return msg;
```

## sample flow


- Ctrl+c & Ctrl+v by import function
```json
[
  {
    "id": "4299c4f.82ac83c",
    "type": "inject",
    "z": "5cf2f65e.b9f958",
    "name": "",
    "props": [
      {
        "p": "payload"
      },
      {
        "p": "topic",
        "vt": "str"
      }
    ],
    "repeat": "",
    "crontab": "",
    "once": false,
    "onceDelay": 0.1,
    "topic": "",
    "payload": "",
    "payloadType": "date",
    "x": 170,
    "y": 80,
    "wires": [
      [
        "47cb3e5.9810dc"
      ]
    ]
  },
  {
    "id": "47cb3e5.9810dc",
    "type": "function",
    "z": "5cf2f65e.b9f958",
    "name": "",
    "func": "msg.resourceType = 'stateful-page';\nmsg.resourceType = 'stateless-page';\nmsg.resourceType = 'router';\nmsg.resourceType = 'bloc';\n\nmsg.componentName = 'test';\n// for windows\nmsg.destination = 'D:\\\\project\\\\app\\\\lib\\\\pages';\n// for linux\n// msg.destination = '/app/project/lib/pages';\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "initialize": "",
    "finalize": "",
    "x": 340,
    "y": 80,
    "wires": [
      [
        "96ac870d.67c038"
      ]
    ]
  },
  {
    "id": "96ac870d.67c038",
    "type": "fluttergenerator",
    "z": "5cf2f65e.b9f958",
    "resourceType": "",
    "componentName": "",
    "x": 540,
    "y": 80,
    "wires": [
      [
        "a3059973.4b0268"
      ]
    ]
  },
  {
    "id": "48db9b3f.9b85b4",
    "type": "debug",
    "z": "5cf2f65e.b9f958",
    "name": "",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "payload",
    "targetType": "msg",
    "statusVal": "",
    "statusType": "auto",
    "x": 890,
    "y": 80,
    "wires": []
  },
  {
    "id": "a3059973.4b0268",
    "type": "function",
    "z": "5cf2f65e.b9f958",
    "name": "",
    "func": "\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "initialize": "",
    "finalize": "",
    "x": 720,
    "y": 80,
    "wires": [
      [
        "48db9b3f.9b85b4"
      ]
    ]
  }
]
```

## result 

Create a file in msg.destination

