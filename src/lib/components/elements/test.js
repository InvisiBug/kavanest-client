text = 'Staff is the BEST'
shift = 3

def caesar(text, shift):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    capital = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    encrypted_text = ''

    for char in text:
        if char == ' ':
            encrypted_text += char
        else:
            if char == char.lower():
                index = alphabet.find(char)
                new_index = (index + shift) % len(alphabet)
                encrypted_text += alphabet[new_index]
            else:
                index = capital.find(char)
                new_index = (index + shift) % len(capital)
                encrypted_text += capital[new_index]

    print('plain text:', text)
    print('encrypted text:', encrypted_text)

caesar(text, shift)
