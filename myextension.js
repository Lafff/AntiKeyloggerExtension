var dict_comparison = {}
var all_keyboard = [[113, 81], [119, 87], [101, 69],
    [114, 82], [116, 84], [121, 89], [117, 85], [105, 73], [111, 79], [112, 80],  [97, 65],
    [115, 83], [100, 68], [102, 70], [103, 71], [104, 72], [106, 74], [107, 75], [108, 76],
    [122, 90], [120, 88], [99, 67], [118, 86], [98, 66], [110, 78], [109, 77]]
    
var all_fake_layout = [[113, 81], [119, 87], [101, 69],
    [114, 82], [116, 84], [121, 89], [117, 85], [105, 73], [111, 79], [112, 80],[97, 65],
    [115, 83], [100, 68], [102, 70], [103, 71], [104, 72], [106, 74], [107, 75], [108, 76],
    [122, 90], [120, 88], [99, 67], [118, 86], [98, 66], [110, 78], [109, 77]]

var all_keyboard_for_xor = [113, 119, 101, 114, 116, 121, 117, 105, 111, 112,  97, 115, 100,
    102, 103, 104, 106, 107, 108, 122, 120, 99, 118, 98, 110, 109,81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 65, 83, 68, 70, 71, 72, 74, 75, 76, 90, 
    88, 67, 86, 66, 78, 77,49, 50, 51, 52, 53, 54, 55, 56, 57, 48]
var cypher_layout = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48]
var fake_cypher_layout = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48]
function signature_func(){
    return 0.5 - Math.random();
}

console.log('Dict somparison of real and fake layout is ', dict_comparison)
fake_cypher_layout = fake_cypher_layout.sort(signature_func)
all_fake_layout = all_fake_layout.sort(signature_func)

for(let i = 0; i < all_keyboard.length; i++){
    dict_comparison[all_fake_layout[i][0]] = all_keyboard[i][0];
    dict_comparison[all_fake_layout[i][1]] = all_keyboard[i][1];
}
for(let i = 0; i < cypher_layout.length; i++){
    dict_comparison[fake_cypher_layout[i]] = cypher_layout[i];
}

var text_fields = ['INPUT','TEXTAREA']
var current_text = ""
var secret_key = 'lkjdfsoenfd';
var key_position = 0
var key_length = secret_key.length
var current_mode_extension = 3;
var main_panel_html =  '<fieldset id= "extensionfieldid" name="myextension"> <legend>Режим расширения</legend> <button type="button" id="extension_mode_one">Режим шифрования ввода</button> <button type="button" id="extension_mode_two">Режим измененной клавиатуры</button> <button type="button" id="extension_off">Выключить расширение</button> </fieldset>'

var my_form_extension = document.createElement('form');
my_form_extension.id = "form_myextension";
document.body.appendChild(my_form_extension);
document.getElementById("form_myextension").innerHTML = main_panel_html;


function get_key_value(){
    key_field = document.getElementById("secretKey");
    secret_key = key_field.value;
    console.log("key value is " + secret_key)
    key_length = secret_key.length
    console.log("key length is " + key_length)
    key_position = 0
    console.log("key pos is " + key_position)
}

function mode_one(){
    secret_key = 'lkjdfsoenfd';
    key_position = 0
    key_length = secret_key.length
    var key_field = document.createElement('input');
    key_field.id= "secretKey";
    key_field.type = "text";
    key_field.onblur = function(){get_key_value()};
    var element = document.getElementById("extensionfieldid");
    check_element = document.getElementById('secretKey')
    if(!check_element){
        element.appendChild(key_field);
    }
    current_mode_extension = 1;
    remove_keyboard();
    console.log("selected 1st mode");
    current_text = ""
}


function mode_two(){
    key_field = document.getElementById("secretKey");
    if(key_field){
        key_field.remove();
    }
    current_mode_extension = 2;
    console.log("selected 2st mode");
}


function off_extension(){
    secret_key = '';
    key_field = document.getElementById("secretKey");
    if(key_field){
        key_field.remove();
    }
    current_mode_extension = 3;
    remove_keyboard();
    console.log("extension is offed, current mode is ", current_mode_extension);
    current_text = ""
}


document.getElementById("extension_mode_one").addEventListener("click", mode_one);
document.getElementById("extension_mode_two").addEventListener("click", mode_two);
document.getElementById("extension_off").addEventListener("click", off_extension);


function create_keyboard(){
    let out = '';
    for (let i = 0; i < 10; i++){
        out +='<div class="k-key">'+String.fromCharCode(cypher_layout[i])+' / '+String.fromCharCode(fake_cypher_layout[i])+'</div>'     
    }
    out += '<div class="clearfix"></div>'
    for (let i = 0; i < all_keyboard.length; i++){
        if(i==10 || i==19){
            out += '<div class="clearfix"></div>'
        }
        out +='<div class="k-key">'+String.fromCharCode(all_keyboard[i][0])+' / '+String.fromCharCode(all_fake_layout[i][0])+'</div>'     
    }
    document.querySelector('#keyboard').innerHTML = out;    
}


function remove_keyboard(){
    var element = document.querySelector('#keyboard');
    if (element){
        document.querySelector('#keyboard').remove();
    }
}


document.onkeypress = function(event){
    var element = document.activeElement;
    if(current_mode_extension == 1){
        var element = document.activeElement;
        const element_name = element.tagName;
        if (text_fields.includes(element_name) || element.isContentEditable){
            var key = event.keyCode || event.charCode;
            if(key != 32 && key != 8 && key != 46){
                current_text = current_text + code_symbol(event.keyCode);
                console.log("pressed key is " + event.key)
                element.oninput = function(){
                    if (current_mode_extension == 1){
                        element.value = current_text;
                        element.textContent = current_text;
                    }
                }
            }
        }
    }

    else if (current_mode_extension == 2){
        var element = document.activeElement;
        var element_name = element.tagName;
        if (text_fields.includes(element_name) || element.isContentEditable){
            current_text = current_text + String.fromCharCode(dict_comparison[event.keyCode]);
            console.log("pressed key is " + event.key)
            element.oninput = function(){
                if (current_mode_extension == 2){
                    element.value = current_text;
                    element.textContent = current_text;
                }
            }
        }
    }
    else if (current_mode_extension == 3){
        console.log("pressed key is " + event.key)
    }

}

document.onkeydown = function() {
    if(current_mode_extension == 1 || current_mode_extension == 2){
        var key = event.keyCode || event.charCode;
        if( key == 8 || key == 46 ){
            current_text = current_text.slice(0,-1);
            var element = document.activeElement;
            element.value = current_text;
            element.textContent = current_text;
            if(current_mode_extension == 1 && key_position>0){
                key_position = key_position - 1;
            }
        }
        else if ( key == 32 ){
            current_text = current_text + String.fromCharCode(32);
            element.value = current_text;
            element.textContent = current_text;
        }
    }
}

document.onclick =function get_active_element() {
    current_text = "";
    if(current_mode_extension == 2){
        var element = document.activeElement;
        const element_name = element.tagName;
        console.log(element)
        
        if (text_fields.includes(element_name) || element.isContentEditable){
            var keyboard_element = document.createElement('div');
            keyboard_element.id = "keyboard";
            document.body.appendChild(keyboard_element);
            create_keyboard();
        }
        else{
            remove_keyboard();
        }
    }
    if(document.activeElement.id == 'secretKey' ){
        secret_key = 'lkjdfsoenfd';
        key_position = 0
        key_length = secret_key.length
    }
}




function code_symbol(symbol){
    key_position = key_position % key_length;
    number_symbol = all_keyboard_for_xor.indexOf(symbol)
    number_key_symbol = all_keyboard_for_xor.indexOf(secret_key.charCodeAt(key_position))
    result_symbol = all_keyboard_for_xor[(number_symbol ^ number_key_symbol)%62];
    key_position = key_position + 1;
    return String.fromCharCode(result_symbol);
}


makedragelement('form_myextension')

function makedragelement(outside_id){
    dragElement(document.getElementById((outside_id)));

    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id)) {
        
        document.getElementById(elmnt.id).onmousedown = dragMouseDown;
        } else {
        
        elmnt.onmousedown = dragMouseDown;
        }
    
        function dragMouseDown(e) {
        e = e || window.event;
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        }
    
        function elementDrag(e) {
        e = e || window.event;
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
    
        function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        }
    }
}