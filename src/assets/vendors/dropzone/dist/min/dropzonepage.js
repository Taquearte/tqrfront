Dropzone.options.mydropzone = {
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 5, // MB
            dictDefaultMessage: '<div class="text-center mb-3"><i class="la la-cloud-upload text-primary" style="font-size:50px"></i></div> <strong>Drop files here or click to upload. </strong></br> (This is just a demo dropzone. Selected files are not actually uploaded.)',
            init: function() {
                this.on("addedfile", function(file) {
                    var removeButton = Dropzone.createElement("<a href='javascript:;'' class='btn btn-danger btn-sm btn-block'>Remove</a>");
                    var _this = this;
                    removeButton.addEventListener("click", function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        _this.removeFile(file);
                    });
                    file.previewElement.appendChild(removeButton);
                });
            }
        }