import { Router , Request , Response} from "express";
import { Certificado } from "../modelos/certificadoBDmodel";
import { verificaToken } from "../middlewares/autenticacion";
import { Comunidad } from "../modelos/comunidadBDModel";
import { Usuario } from '../modelos/usuarioBDModel';
import fileUpload from 'express-fileupload';
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const rutasCertificados = Router();
const sanitizeHtml = require('sanitize-html');

rutasCertificados.post('/crear', [verificaToken],async (req: any, res: Response) => {
    // Validaciones
    // logo default de vecired
    const defaultLogoPath = 'logosCertificados/veciRed.png';

    //si se sube un logo nuevo
    let logoPath = '';
  
    if (!req.files || !req.files.logo) {
        // si no se sube logo, toma vecired logo
      logoPath = defaultLogoPath;
    } else {
        //si sube logo,  toma la imagen y hace las validaciones
      const logoFile = req.files.logo as fileUpload.UploadedFile;

      if (!logoFile.mimetype.startsWith('image/png')) {
            return res.json({
            ok: false,
            mensaje: 'El archivo debe ser de tipo PNG.',
            });
      }
      //se guarda en logosCertificados, se tiene que analizar si se haran carpetas secundarias, para que no coincidan nombres 
      logoPath = 'logosCertificados/' + Date.now() + '.png';
      try {
        // uso de sharp para resizear imagen, se trajo arriba para  poder hacer la funcion del logo vecired
        await sharp(logoFile.data)
          .resize(300, 300)
          .toFile(logoPath);
      } catch (err) {
            return res.json({
            ok: false,
            mensaje: 'Error al procesar el logo.',
            });
      }
    }
    // Validación de caracteres en el título
    var caracteres = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{3,50})+$/g;
    if (caracteres.test(req.body.titulo) === false) {
        return res.json({
            ok: false,
            mensaje: 'Caracteres inválidos en el título, ingrese otro nombre.'
        });
    }

    if (req.body.titulo.length > 50) {
        return res.json({
            ok: false,
            mensaje: 'Título de certificado demasiado largo.'
        });
    }

    if (req.body.descripcion.length > 1200) {
        return res.json({
            ok: false,
            mensaje: 'Descripción del correo demasiado larga, intente acortar texto.'
        });
    }
    // se usa sanitize-html para limpiarla de cualquier codigo malicioso
    const descripcionSanitizada = sanitizeHtml(req.body.descripcion);

    var caracteresrep = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{3,30})+$/g;
    if(caracteresrep.test(req.body.replegal)== false){
        return res.json({
            ok: false,
            mensaje: 'Texto con caracteres invalidos.'
        });
    }

    if (req.body.replegal.length > 30) {
        return res.json({
            ok: false,
            mensaje: 'Nombre del representante demasiado largo.'
        });
    }

    if (req.body.replegal.length < 3) {
        return res.json({
            ok: false,
            mensaje: 'Nombre del representante demasiado corto.'
        });
    }


    // Validación del formato del número de contacto
    var caracterescelular = /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/;
    if (caracterescelular.test(req.body.contacto) === false) {
        return res.json({
            ok: false,
            mensaje: 'Formato de celular no válido, intente de nuevo.'
        });
    }

        try {

            // Se verifica si la flag de emitirCertificado es igual a 0, si es asi, no se puede crear un certificado
            const comunidad = await Comunidad.findById(req.usuario.comunidad);
            if (!comunidad) {
            return res.json({
                ok: false,
                mensaje: 'No se encontró la comunidad en la base de datos.'
            });
            }
        
            if (comunidad.emitirCertificado === 0) {
            return res.json({
                ok: false,
                mensaje: 'La comunidad no puede emitir certificados.'
            });
            }
        
            // Revisar si  existe el usuario en la base de datos
            const usuario = await Usuario.findById(req.usuario._id);
            if (!usuario) {
            return res.json({
                ok: false,
                mensaje: 'No se encontró el usuario en la base de datos.'
            });
            }
            
            // Revisar si el rol 1 (privilegiado) pertenece al la comunidad 
            const index = usuario.comunidad.findIndex(comunidad => comunidad.toString() === req.usuario.comunidad);

            if (index === -1 || usuario.rol[index] !== 1) {
            return res.json({
                ok: false,
                mensaje: 'No tienes permisos para crear un certificado en esta comunidad.'
            });
            }
        
            // Crear el certificado
            const dataCertificado = {
            titulo: req.body.titulo,
            descripcion: descripcionSanitizada,
            replegal: req.body.replegal,
            contacto: req.body.contacto,
            logo: logoPath,
            comunidad: req.usuario.comunidad
            };
        
            const certificadoBD = await Certificado.create(dataCertificado);
            res.json({
            ok: true,
            dataCertificado: certificadoBD
            });
        } catch (err) {
            console.error('Error:', err); // Agregar esta línea para imprimir el error en la consola
            res.json({
            ok: false,
            err
            });
        }
      
    });
//actualizar certificado

rutasCertificados.post('/update', verificaToken, async (req: any, res: Response) => {
    try {
        const certificadoId = req.body._id;

        // Buscar el certificado por ID
        const certificado = await Certificado.findById(certificadoId);

        if (!certificado) {
            return res.json({
                ok: false,
                mensaje: 'No existe el certificado especificado',
            });
        }

        // Obtener el ID de la comunidad asociada al certificado
        const comunidadId = certificado.comunidad.toString();

        // Verificar si el usuario pertenece a la comunidad y tiene rol igual a 1
        const usuario = await Usuario.findById(req.usuario._id);

        if (!usuario) {
            return res.json({
                ok: false,
                mensaje: 'No se encontró el usuario en la base de datos',
            });
        }

        const index = usuario.comunidad.findIndex(
            (comunidad) => comunidad.toString() === comunidadId
        );

        if (index === -1 || usuario.rol[index] !== 1) {
            // El usuario no tiene los permisos necesarios para actualizar el certificado
            return res.json({
                ok: false,
                mensaje: 'No tienes permisos para actualizar este certificado en la comunidad especificada',
            });
        }

        // Logo handling logic from the previous code
        let logoPath = req.body.logo;
        if (req.files && req.files.logo) {
            const logoFile = req.files.logo as fileUpload.UploadedFile;
        
            if (!logoFile.mimetype.startsWith('image/png')) {
                return res.json({
                    ok: false,
                    mensaje: 'El archivo debe ser de tipo PNG.',
                });
            }
        
            if (logoFile.name !== 'veciRed.png') {
                // If a different logo is uploaded, process and save it
                logoPath = 'logosCertificados/' + Date.now() + '.png';
                try {
                    const processedImage = await sharp(logoFile.data)
                        .resize(300, 300)
                        .toFile(logoPath);
        
                    if (processedImage) {
                        console.log("Processed Image:", processedImage);
        
                        // Delete the existing logo file from the server (if it's not "veciRed.png")
                        if (certificado.logo !== 'logosCertificados/veciRed.png') {
                            const existingLogoPath = path.resolve(certificado.logo);
                            await fs.unlink(existingLogoPath);
                        }
                    }
                } catch (err) {
                    console.error("Error while processing the logo:", err);
                    return res.json({
                        ok: false,
                        mensaje: 'Error al procesar el logo.',
                    });
                }
            }
        }

        // Validaciones
        
            // Validación de caracteres en el título
            var caracteres = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{3,50})+$/g;
            if (caracteres.test(req.body.titulo) === false) {
                return res.json({
                ok: false,
                mensaje: 'Caracteres inválidos en el título, ingrese otro nombre.',
                });
            }
        
            if (req.body.titulo.length > 50) {
                return res.json({
                ok: false,
                mensaje: 'Título de certificado demasiado largo.',
                });
            }
        
            if (req.body.descripcion.length > 1200) {
                return res.json({
                ok: false,
                mensaje: 'Descripción del correo demasiado larga, intente acortar texto.',
                });
            }
            const descripcionSanitizada = sanitizeHtml(req.body.descripcion);

            // Validación del formato del número de contacto
            var caracterescelular = /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/;
            if (caracterescelular.test(req.body.contacto) === false) {
                return res.json({
                ok: false,
                mensaje: 'Formato de celular no válido, intente de nuevo.',
                });
            }

        // Update the certificado with the new data
        const dataCertificado = {
            titulo: req.body.titulo,
            descripcion: descripcionSanitizada,
            replegal: req.body.replegal,
            contacto: req.body.contacto,
            logo: logoPath,
        };

        const certificadoActualizado = await Certificado.findByIdAndUpdate(
            certificadoId,
            dataCertificado,
            { new: true }
        );

        if (!certificadoActualizado) {
            return res.json({
                ok: false,
                mensaje: 'No se pudo actualizar el certificado',
            });
        }

        res.json({
            ok: true,
            certificado: certificadoActualizado,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            mensaje: 'Error al actualizar el certificado',
        });
    }
})


  rutasCertificados.get('/', [verificaToken], async (request: any, response: Response) => {
      try {
          const comunidadId = request.usuario.comunidad;
          const certificados = await Certificado.find({ comunidad: comunidadId })
          .populate({ path: 'comunidad' })
          .exec();
          
          if (certificados.length === 0) {
              return response.json({
                  ok: true,
                  mensaje: 'La comunidad no presenta certificados válidos para emitir',
              });
          }
  
          response.json({
              certificados,
              ok: true
          });
      } catch (error) {
          response.status(500).json({
              ok: false,
              mensaje: 'Error al obtener los certificados',
          });
      }
  })

export default rutasCertificados;