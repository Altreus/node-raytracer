function setControlsFor(objType, cb) {
    var baseControls = {
        x: 'Int',
        y: 'Int',
        z: 'Int'
    };

    var objControls;

    switch(objType) {
        case 'sphere':
            objControls = sphereInfo;
            break;
    }

    var controls = $.extend({}, baseControls, objControls),
        cArea = $('#controls');
    
    for (var c in controls) {
        var control = $('<div/>').addClass("control").addClass(controls[c]).attr('id', 'control-' + c);
        $('<label/>').attr('for', 'control-' + c).append(c).appendTo(control);

        switch (controls[c]) {
            case 'Int':
                $('<input/>').attr('type', 'text')
                             .attr('value', 0).appendTo(control);
                break;
        }

        cArea.append(control);
    }

    $('<input/>').attr('type', 'submit').appendTo(cArea).click(function() {
        var data = {};
        $('#controls div').each(function(){
            var propName = $(this).find('label').text();
            var value = $(this).find(':input').val();

            data[propName] = value;
        });

        cb(data);
    });
}
