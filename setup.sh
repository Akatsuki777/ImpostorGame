#!/bin/bash

#Generate a flask secret key if one does not already exist
if ! find . -name .env &> /dev/null; then
    echo "There is no .env file, generating it."
    touch .env
fi

if ! grep -q "FLASK_SECRET_KEY" .env; then

    echo "No FLASK_SECRET_KEY set, setting up one for you."

    SECRET=$(python3 -c "import secrets;print(secrets.token_hex(16))")

    echo "FLASK_SECRET_KEY=$SECRET" >> .env

fi

