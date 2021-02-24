# OSARO Frontend Challenge
In this challenge you will design a single-page JS app in which a user
can control a simple robot that picks and places objects. Below are
instructions to install and run the robot code. You can communicate with
the robot through a simple JSON API. Read the code in `robot.py` to
learn how the robot behaves, and what actions the user can take.

# Requirements
- Use React js. You can add any other modules you like.
- The user should be able to click buttons to change the state of the
robot. It should be clear which actions are available to the user given
the state of the robot. 
- This sure is a finicky robot. Some of the API calls you make will fail
at random with HTTP error 503. If this happens, make the API call again
without prompting the user.
- Some of the API calls have purposely been slowed down. Make sure that
the interface handles this gracefully. 
- Sometimes you will find that the robot is in a different state than
you expect. For example, the robot will randomly switch to the `FAILED`
state. Make sure that the interface informs the user of this fact and
handles this situation properly. 
- If the robot fails too often, the user may want to have it repaired.
When the robot reaches the `FAILED` state for the *third time*, the
user should be prompted with a choice to put the robot in 'repair' mode.
The fail count should be reset when the page is refreshed. 
- The user should be able to see a history of commands sent by the 
UI to the robot, including a timestamp indicating when the command was
issued. This list does not have to be saved between page refreshes.

# API
## /state
Returns the current robot state as a JSON string.

## /action
Control the robot by making an AJAX call to this endpoint. The body of
the API call should be a JSON encoded object with the key `action` set
to one of the commands. To see the available commands, check out the
implementation of the Python server.

For example, the first call to the robot would be
```
{ "action": "start" }
```

Example curl
```
curl -X POST http://localhost:5000/action \
  -H 'content-type: application/json' \
  -d '{ "action": "start" }'
```

# Robot
The robot works with both Python 2 and 3.

```bash
pip install -r requirements.txt
```

Run the Application
```bash
python robot.py
```

The API is now available at `http://localhost:5000`