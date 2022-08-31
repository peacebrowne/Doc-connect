var socket = io('https://docconnect2022.herokuapp.com/');
	
		var el;

		socket.on('connection', function() {
		console.log('');
		});
		
		socket.on('message', (data) =>{
            // getDocData()
            // insertNewMessageBefor()
            // console.log(data)
            insertNewMessageBefor(data)


			// display_doctorView();

			if (JSON.stringify(data.fromUser) === JSON.stringify(localStorage.getItem("userID")) ){
				console.log("nothing to do");
			}
			else{

                instant_messsage(data)
				// displayPreviousConversation(openChat[0],openChat[1],openChat[2])
			}
			
			
		});

        socket.on('appointment', (data) =>{
            
            console.log(data)
			
		});

        // calls
        socket.on('call', (data) =>{
            
            incoming_call(data)
			
		});