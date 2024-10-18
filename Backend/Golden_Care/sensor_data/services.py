import requests
import urllib.parse

def format_phone_number(phone_number):
    """
    Format the phone number to meet the international standard.
    You can adjust this function according to your specific needs.
    """
    # Example: Add country code if not present
    if not phone_number.startswith('+'):
        # Assuming country code is +1 for example purposes, change accordingly
        phone_number = '+1' + phone_number
    return phone_number

def send_sms_notice(phone_number, message):
    """
    Sends an SMS message to the user's contact number using Uwazii API.

    Args:
        phone_number (str): The recipient's phone number in international format (e.g., +1234567890).
        message (str): The message to be sent.

    Returns:
        dict: A dictionary containing the status of the request and any error message if applicable.
    """
    # Uwazii API token and sender ID
    token = "I7ShKoNk866xU4IGWOT85zMei1ZbYI"
    sender_id = "Uwazii"

    # Format the phone number using the format_phone_number function
    formatted_number = format_phone_number(phone_number)
    
    # URL encode the parameters
    encoded_token = urllib.parse.quote(token)
    encoded_phone_number = urllib.parse.quote(formatted_number)
    encoded_message = urllib.parse.quote(message)
    encoded_sender_id = urllib.parse.quote(sender_id)

    # Construct the API request URL
    url = f"https://api2.uwaziimobile.com/send?token={encoded_token}&phone={encoded_phone_number}&text={encoded_message}&senderID={encoded_sender_id}"

    try:
        # Send the GET request to Uwazii API
        response = requests.get(url)

        # Check the response from the API
        if response.status_code == 200:
            return {"status": "success", "message": "SMS sent successfully."}
        else:
            return {"status": "error", "message": f"Failed to send SMS. Response: {response.text}"}
    except requests.exceptions.RequestException as e:
        # Handle any exceptions that occur during the request
        return {"status": "error", "message": f"An error occurred: {str(e)}"}
