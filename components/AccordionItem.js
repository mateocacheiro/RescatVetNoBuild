import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { careActions } from '../store/care-slice';

const AccordionItem = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const title = props.title
    const animalID = props.animalID
    const contentID = props.contentID
    const sub_ids = props.sub_ids
    const open_default = props.open_default
    //console.log("Array of sub ids: ", sub_ids)
    let render_broken

    if (sub_ids && sub_ids.includes(5) || sub_ids && sub_ids.includes(6)) {
        render_broken = true
    }

    const [isContentHidden, setIsContentHidden] = useState(true)
    const [iconName, setIconName] = useState('down')

    // --L_src_RecursosExternos__enlaces--F

    useEffect(() => {
        if (open_default) {
            setIsContentHidden(false)
            setIconName('down')
        }
    }, [open_default])

    const str = "CatDogandDragons"

    const renderContent = () => {
        if (animalID === 0) {
            if (contentID === 19) {
                return(
                    <View style={styles.content}>
                        <Text style={styles.text}>- Transportín / caja</Text>
                        <Text style={styles.text}>- Toallas / mantas</Text>
                        <Text style={styles.text}>- Collar con arnés</Text>
                        <Text style={styles.text}>- Bozal</Text>
                        <Text style={styles.text}>- Guantes</Text>
                        <Text style={styles.text}>- Linterna</Text>
                        <Text style={styles.text}>- Alimento para traerle (adaptado a la especie)</Text>
                        <Text style={styles.text}>- Gasas</Text>
                        <Text style={styles.text}>- Desinfectante (cristalmina o betadine)</Text>
                        <Text style={styles.text}>- Vendas</Text>
                        <Text style={styles.text}>- Agua y jabón / suero fisiológico</Text>
                        <Text style={styles.text}>- Alicates</Text>
                        <Text style={styles.text}>Este material nos puede servir para dar los primeros auxilios si es posible, y si no lo es, para trasladarlo al veterinario. Debemos intentar que el animal se estrese lo mínimo posible, por lo cual hay que evitar ruidos fuertes, golpes, gritos y debemos intentar mantener la calma.</Text>
                    </View>
                )
            }
        }
        if (animalID === 1) {
            if(contentID === 1) {
                return(
                    <View style={styles.content}>
                        <Text style={styles.text}>Antes de suministrar alimento o agua a un animal, primero debemos acudir a la clínica veterinaria para que pauten la cantidad de comida (ya sea en grano o en papilla), cuántas tomas al día, etc.</Text>
                        <Text style={styles.text}>Las palomas son granívoras, es decir, que se alimentan de semillas.</Text>
                        <Text style={styles.text}>La cantidad recomendada para un <Text style={styles.textBold}>adulto</Text> es de 30 gramos de semillas al día.</Text>
                        <Text style={styles.text}>Siempre pondríamos más cantidad puesto que a veces rebuscan y las tiran.</Text>
                        <Text style={styles.text}>Existen mixturas para palomas o tórtolas, pero si no podemos conseguirlas, los adultos pueden comer alpiste para canarios con mezcla de granos secos: trigo, maíz, cañamones, soja verde, sésamo, mijo rojo y amarillo, trigo sarraceno, lino, guisantes, pipas pequeñas, lentejas, arroz, cebada, avena.</Text>
                        <Text style={styles.text}>Si la paloma está aprendiendo a comer o <Text style={styles.textBold}>aún no come sola</Text>, probablemente tengamos que darle papilla. Lo primero es comprobar que tenga el buche vacío (tocándole con el dedo pulgar e índice en forma de pinza - sin apretar demasiado - en la zona baja de la garganta, no deberíamos notar granitos). Si no disponemos de papilla para palomas, como última opción se puede dar papilla de cereales para bebé <Text style={styles.textBold}>sin leche</Text> (como la de 5 cereales). En cuanto podamos, compraremos una papilla especial para pichones o palomas.</Text>
                        <Text style={styles.text}>Prepararemos la papilla con agua tibia y el polvo, la consistencia debe ser como la de un yogur líquido. Empezaremos dando 5 mililitros con una jeringa. Abriremos el pico y en la base de la lengua pondremos la cantidad equivalente a una lenteja o un guisante, dejaremos que cierre el pico y trague. Repetiremos esto hasta que haya tomado los 5 mililitros. También se puede sondar, pero esto lo debe hacer alguien que ya tenga experiencia con ello, puesto que puede ocasionar una neumonía por aspiración (la sonda va a los pulmones en vez de al buche y se introduce la papilla en los pulmones, causando así una infección o, en el peor de los casos, la muerte por asfixia). Después esperaremos unas dos horas y comprobaremos si el buche se ha ido vaciando, lo cual quiere decir que la papilla transita hacia el aparato digestivo. Si es así, podemos darle otros 5 mililitros dos o tres horas después de la primera toma, siempre comprobando que el buche se haya ido vaciando. Si no se vacía, debemos llevarla al veterinario de forma relativamente urgente. Además de darle papilla, lo ideal es ponerle grano para que vaya aprendido a comer instintivamente. Debemos comenzar con granos pequeños tipo alpiste, sésamo, mijo, guisantes machacados en trocitos o maíz machacado en trocitos.</Text>
                        <Text style={styles.text}>Las semillas o legumbres que le demos siempre deben ser en seco, para evitar fermentaciones en el buche.</Text>
                    </View>
                )
            }
            else if(contentID === 2) {
                return(
                    <View style={styles.content}>
                        <Text style={styles.text}>Si la paloma está sana (sea adulta o pichón juvenil con todas las plumas), lo ideal es ubicarle en un transportín amplio, donde pueda estirar las alas, y pondremos en el suelo papel de periódico o revista, o un empapador. De forma opcional podemos ponerle también un trapo enrollado en forma de dónut a modo de nido para que descanse. Deberíamos evitar cajas de cartón (de forma provisional pueden sernos útiles, pero no para mantenerlas más tiempo) o jaulas muy abiertas. </Text>
                        <Text style={styles.text}>Para ponerle comida, lo ideal es un platito plano de cerámica o tapa de bote grande con un poco de profundidad; para el agua podemos usar un envase un poco más alto que el de comida. Debe tener comida y agua siempre disponibles.</Text>
                        <Text style={styles.text}>Es preferible que tenga vistas al exterior y luz natural, para asegurarnos de que mantiene el ritmo de comida y sueño habitual. De hecho, lo ideal es que la pongamos al sol (de forma directa, no con un vidrio de por medio), como mínimo, 10 minutos al día, ya que así fijan mucho mejor el calcio a los huesos gracias a la vitamina D. Por supuesto, debemos ir controlando que no le dé un golpe de calor, por ejemplo en verano.</Text>
                        <Text style={styles.text}>Si la paloma está enferma o es un pichón muy pequeño (aún tiene plumones amarillos), ubicaremos el transportín en un lugar calentito, tranquilo y luminoso. Igualmente, sería ideal que tuviera vistas y luz natural, y una exposición controlada al sol de 10 minutos al día sin un vidrio de por medio.</Text>
                        <Text style={styles.text}>Debemos evitar provocarles estrés, es decir que dejaremos el transportín en un lugar no muy transitado, y si es posible lejos de ruidos y de otros animales que puedan asustarles. Recordemos que las palomas son animales presa y se asustan con facilidad, así que en nuestra interacción con ellas intentaremos también guardar silencio y evitar todos los ruidos que nos sea posible. Esto también nos ayudará a que no se impronte, es decir, que no se acostumbre a los humanos, para facilitar la liberación cuando ya esté recuperada.</Text>
                    </View>
                )
            }
            else if(contentID === 3) {
                return(
                    <View style={styles.content}>
                        <Text style={styles.title2}>Parásitos</Text>
                        <View style={styles.subdivider}/>
                        <Text style={styles.text}>Las palomas, como todos los animales que viven en el exterior sin cuidados veterinarios y una alimentación suficiente, pueden tener parásitos tanto externos como internos.</Text>
                        <Text style={styles.text}>Los <Text style={styles.textBold}>parásitos externos</Text> más comunes son las moscas planas, los piojos y los ácaros. Las moscas planas y los piojos se pueden eliminar con un antiparasitario en spray llamado Tabernil. En este caso, lo ideal es rociar el Tabernil a unos 50 centímetros del animal, y preferentemente en un transportín que luego podamos limpiar, o una caja que podamos tirar. Los parásitos suelen ubicarse debajo de las alas (en la axila), en la zona del cuello o debajo de la cola, aunque las moscas planas se mueven con rapidez entre las plumas, de ahí la importancia de tener a la paloma en un lugar semicerrado. El Tabernil no presenta mucha toxicidad para el ave, aunque se debe intentar evitar rociarlo directamente en los ojos, pico u oídos. En cualquier caso, se recomienda leer el modo de empleo en el envase. Aparte del Tabernil, también se puede usar pipeta de Frontline, pero ésta tiene una mayor toxicidad para el ave, y la cantidad y forma de administrarlo nos la debe pautar une veterinarie.</Text>
                        <Text style={styles.text}>En cuanto a los <Text style={styles.textBold}>parásitos internos</Text>, los más comunes son: tricomonas (se observan placas blancas en el interior del pico y garganta, si hay mucha proliferación también pueden salir por fuera del pico y sufrir heces diarreosas y muy olorosas), los coccidios (suelen beber mucho y comer poco o nada, y hacer heces muy líquidas, verdosas y olorosas o incluso sanguinolentas), hongos o levaduras dentro del buche… Más abajo te dejamos más información sobre lo que pueden significar los distintos tipos de heces.</Text>
                        <Text style={styles.text}>El tratamiento para los parásitos internos es muy diferente según el parásito que tenga, así que, cuando recojamos una paloma, aunque no esté en situación de urgencia, debemos llevarla a consulta veterinaria cuanto antes para que le hagan una exploración y un análisis coprológico y de buche, y que nos pauten medicación en caso de necesitarla.</Text>
                        
                        <Text style={styles.title2}>Deposiciones</Text>
                        <View style={styles.subdivider}/>
                        <Text style={styles.text}>Las deposiciones pueden ser un buen indicativo del estado de salud de un animal. Para poder observarlas bien, en el transportín debemos colocar un empapador o un papel de cocina, periódico o revista, lo cual nos facilitará la recogida.</Text>
                        <Text style={styles.text}>A continuación te damos más detalles sobre lo que indican y a qué se pueden deber los distintos tipos de deposiciones en las palomas.</Text>
                        <Text style={styles.text}>Las deposiciones en las palomas se dividen en tres partes: orina (la parte líquida), heces (parte sólida) y los uratos (la parte blanca en las heces). Las deposiciones normales pueden tener algo de orina, pero el líquido en exceso puede ser síntoma de que algo no va bien. Las heces (parte sólida de la deposición) deben ser una bolita o una espiral de color marrón verdoso con uratos blancos, y lustrosa pero no mucosa.</Text>
                        <Text style={styles.text}>En caso de infección por tricomonas, el animal puede presentar una diarrea con olor fuerte y agrio (además de placas blancas o amarillentas en el interior del pico o incluso fuera del pico).</Text>
                        <Text style={styles.text}>En caso de tener coccidios, las deposiciones pueden ser pastosas y bastante verdes en caso de no sufrir una infección muy avanzada, pero cuando ésta ya es más grave, la diarrea puede llegar a contener sangre.</Text>
                        <Text style={styles.text}>También puede darse el caso de que la paloma expulse gusanos con las deposiciones, puesto que pueden tener este tipo de parásitos intestinales. Pueden ser vermes más grandes o pequeñas, suelen ser de color blanquinoso y en ocasiones se mueven.</Text>
                        <Text style={styles.text}>En cualquier caso, puesto que para eliminar estos parásitos hace falta dar medicación específica, recomendamos llevar al animal a a la clínica veterinaria para que nos paute el tratamiento (tipo de medicamento, duración, dosis…).</Text>


                        <Text style={styles.title2}>Viruela</Text>
                        <View style={styles.subdivider}/>
                        <Text style={styles.text}>Por lo general, si la paloma presenta costras en las patas, la base del pico o los ojos se debe a que sufre viruela. No es contagiosa para el humano ni otros mamíferos pero sí para otras aves, con lo que si convivimos con más aves debemos evitar que compartan espacio, comida y agua, y usar guantes desechables o lavarnos bien las manos después de tocar al ave afectada.</Text>

                        <Text style={styles.title2}>Pelos o hilos enredados en los dedos</Text>
                        <View style={styles.subdivider}/>
                        <Text style={styles.text}>Debemos llevar muchísimo cuidado al retirarlos, ya que si están muy apretados se pueden provocar heridas o romper los huesos (es posible que ya lo estén). Por ello, si los pelos o hilos están muy incrustados en la carne, es mejor acudir a la clínica veterinaria y que los retiren allí para evitar causar un mal mayor.</Text>
                        <Text style={styles.text}>Si decides quitarlos, antes de tirar de los hilos, debemos usar una tijera para cortarlos y, una vez estén cortados, usaremos unas pinzas de depilar para tirar cuidadosamente de ellos. Si vemos que siguen enmarañados, procederemos a cortar por otro lugar hasta que salgan con facilidad.</Text>


                        <View onLayout={event => {
                            const splay_layout = event.nativeEvent.layout 
                            dispatch(careActions.updateSplayPosition(splay_layout.y))
                        }
                        }><Text style={styles.title2}>Splay Leg o patas extendidas</Text></View>
                        <View style={styles.subdivider}/>
                        <Text style={styles.text}>Splay leg significa literalmente pata extendida, y se suele ver una pata en una posición no natural (normalmente la pata sale hacia afuera). No es una urgencia en sí, pero puesto que se puede confundir con una fractura o dislocación, debemos acudir a la clínica veterinaria para que se diagnostique.</Text>
                        <Text style={styles.text}>En el caso de splay leg lo más probable es que el ave necesite llevar unos fijadores en las patas para corregir la posición de éstas, o que tenga que pasar por una cirugía. Por lo tanto, cuanto antes se diagnostique y empiece a tratarse, mejor pronóstico tendrá. En cualquier caso, le veterinarie lo valorará y pautará lo mejor para cada caso.</Text>
                        <Text style={styles.text}>Para los cuidados en casa de una paloma con splay leg, puedes leer el apartado más arriba llamado “Espacio de la paloma en casa”, con el añadido de que deberemos asegurarnos de que la superficie del transportín sea blanda, para evitar rozaduras o heridas producidas al arrastrarse.</Text>
                        
                        <Text style={styles.title2}>Parada de buche</Text>
                        <Text style={styles.subdivider} />
                        <Text style={styles.text}>La parada de buche es un caso de urgencia, ya que si no se detecta a tiempo el animal <Text style={styles.textBold}>puede fallecer</Text>. Suele suceder más a menudo en pichones que en adultos, aunque en éstos también puede pasar. Puede deberse a parásitos presentes en el buche, a que la papilla esté en mal estado o fermentada antes de la toma, etc.</Text>
                        <Text style={styles.text}>La forma de saber si el animal transita la comida (es decir, si la comida pasa del buche al estómago), es ir comprobando el buche después de las tomas de papilla (si toma papilla) o palpándolo varias veces al día si toma grano.</Text>
                        <Text style={styles.text}>En el caso de los pichones que aún tomen papilla, lo ideal es palpar el buche <Text style={styles.textBold}>antes</Text> de la siguiente toma, es decir: damos una toma de papilla, lo volvemos a dejar en su espacio o transportín, y al cabo de unas horas, en el momento de la siguiente toma, palpamos. Si el buche está vacío significa que transita y en ese momento damos la papilla de nuevo. Si el buche tiene aún bastante contenido de la toma anterior, significará que no transita bien y debemos acudir a consulta veterinaria para evitar que la papilla fermente en el buche (creándose así levaduras, hongos o proliferen parásitos) y que el animal no reciba nutrientes. Todo esto conlleva un peligro para la salud de la paloma, por eso, si no transita, debemos acudir a consulta veterinaria.</Text>
                        <Text style={styles.text}>Si el animal es adulto o ya come grano, aprovecharemos los procedimientos de curas, rehabilitación, medicación o limpieza del transportín para comprobar el buche y así evitar que la manipulación sea más frecuente.</Text>
                        <Text style={styles.text}>La forma de comprobar si la comida transita es utilizando nuestros dedos pulgar e índice y, a modo de pinza, presionando suavemente en el buche, que es la zona entre el cuello y la quilla (el hueso central que sobresale en el centro del abdomen). Justo encima de la quilla es donde notaremos el buche hinchado bien con la papilla (más blando) o bien con los granos de alpiste (si tiene suficiente cantidad los notaremos fácilmente al palpar). También percibiremos si transita gracias a las heces, ya que cuando la comida no pasa del buche al estómago, las heces son pocas o directamente el animal no defeca.</Text>
                    </View>
                )
            }
            else if(contentID === 4) {
                return(
                    <View style={styles.content}>
                        <Text style={styles.title2}>Si es adulta</Text>
                        <View style={styles.subdivider}/>
                        <Text style={styles.text}>La liberaremos cuando este al 100% donde la recogimos (si es posible) para que vuelva con su familia y a un entorno donde sabe sobrevivir. En caso de ser una zona muy peligrosa, también se puede liberar en un lugar y un momento del día no haya mucho tránsito de personas u otros animales, como un parque relativamente grande y tranquilo, o cerca de una zona de montaña.</Text>
                        <Text style={styles.text}>Lo ideal es liberarlas donde haya otros grupos de palomas. Colocaremos el transportín en el suelo y abriremos la puerta a una distancia prudencial del otro grupo de palomas para que el ave salga por su propia pata. Es buena idea poner de comer al grupo y, cuando estén concentradas en picotear el suelo, liberar a la nuestra. </Text>
                        <Text style={styles.text}>También existe la posibilidad de llevarla a un voladero de una persona con experiencia que haga liberaciones grupales. Aquí te dejamos *enlaces* donde puedes contactar con otras personas, bien que estén en la misma situación que tú o bien que tengan el voladero.</Text>


                        <Text style={styles.title2}>Si es pichón</Text>
                        <View style={styles.subdivider}/>
                        <Text style={styles.text}>Lo ideal sería que la mantengamos en casa hasta que tenga todas las plumas de adulto y su condición física sea la óptima. En casa debemos dejar que vuele para que fortalezca las alas, aprenda a calcular distancias y alturas y a esquivar objetos. No debemos hablarle, tocarle o tener contacto a menudo con ella, sólo el justo y necesario, para evitar que se impronte (es decir, para que no dependa del humano el resto de su vida), puesto que si se impronta no sobrevivirá en libertad.</Text>
                        <Text style={styles.text}>Las primeras veces que soltemos por casa al pichón, lo ideal es que sea en una habitación sin demasiados recovecos para evitar que se caiga sin querer en ellos, con las ventanas cerradas y a ser posible con las persianas bajadas (tienden a querer irse por la ventana si ven el exterior, y se dan un golpetazo contra el vidrio). Es posible que de primeras no sepa o no pueda levantar el vuelo. Para estimularla, podemos posarla sobre nuestra mano, y subir y bajar la mano para promover que aletee. Más adelante, cuando tenga más práctica con el vuelo, ya podremos soltarla en una habitación con alturas (armarios, estanterías, etc.) para que vaya aprendiendo a subir del suelo a altura.</Text>
                        <Text style={styles.text}>Se recomienda soltar al pichón todos los días durante el tiempo que podamos, para que sus músculos vayan tonificándose y el animal vaya cogiendo práctica y fuerza.Una vez esté listo para liberarlo, procederemos a ello. Te recomendamos leer la información de más arriba, sobre la liberación de adultos.</Text>

                        <Text style={styles.title2}>Si no es posible la liberación</Text>
                        <View style={styles.subdivider}/>
                        <Text style={styles.text}>1- Nos podemos plantear adoptar a la paloma. Son animales cariñosos, curiosos y juguetones. Si no son liberables, son un animal muy agradable con el que convivir. La mayoría de palomas necesitan convivir con otra paloma, puesto que son animales gregarios (viven en grupos o bandadas y forman vínculos afectivos con otras palomas), así que lo ideal sería adoptar a dos palomas a menos que le veterinarie no lo recomiende (ya sea por motivos de salud o de carácter). La presentación entre dos palomas que no se conocen previamente, debe ser paulatina y con un periodo de adaptación de varios días o incluso un par de semanas. Es un procedimiento similar a la presentación en los gatos.</Text>
                        <Text style={styles.text}>2- Existen refugios y santuarios con voladeros donde ya viven otras palomas. Ésta es una buena opción para que la paloma conviva con otras de su misma especie. En este caso, deberemos contactar con *asociaciones o santuarios* que dispongan de estas instalaciones, y deberemos ayudarles económicamente para el mantenimiento del animal (ya sea bien con cuota de socie, *adrine, o como mejor consideres).</Text>
                        <Text style={styles.text}>3- También existen particulares que disponen de voladeros con animales rescatados. En este *apartado* te dejamos enlaces en distintas redes sociales donde preguntar sobre este tema.</Text>
                    </View>
                )
            }
            else if (contentID == 5) {
                return (
                    <View style={styles.content}>
                        {sub_ids.includes(5) && <View>
                        <Text style={styles.title2}>Si no hay pulso</Text>
                        <View style={styles.subdivider}/>
                        <Text style={styles.text}>Debemos comprobar si el corazón late acercando la oreja a la parte izquierda de su cuerpo, bajo el ala, o localizando el corazón con los dedos índice y corazón. Si no late, realizaremos la <TouchableOpacity onPress={props.onScrollToNoPulse}><Text style={styles.hypertext}>reanimación cardiopulmonar (RCP)</Text></TouchableOpacity>.</Text>
                        </View>}

                        {sub_ids.includes(0) && <View>
                        <Text style={styles.title2}>Si no respira</Text>
                        <View style={styles.subdivider}/>
                        <Text style={styles.text}>Es muy difícil recuperarlos y si ha pasado mucho tiempo no podremos ayudar. Si acaba de suceder, intentaremos hacer <TouchableOpacity onPress={props.onScrollToArtificialBreathing}><Text style={styles.hypertext}>respiración artificial</Text></TouchableOpacity>.</Text>
                        </View>}
                        
                        {sub_ids.includes(1) && <View>
                        <Text style={styles.title2}>Si no está consciente</Text>
                        <View style={styles.subdivider}/>
                        <Text style={styles.text}>Lo normal es que tenga una respiración lenta y profunda, lo que implicaría que está en coma. También es probable que sus pupilas no respondan a la luz (lo que indica daños neurológicos) y que tenga la temperatura baja. En este caso poco podremos hacer aparte de llevarle a la clínica veterinaria. Debemos intentar que no pierda calor, así que la envolveremos en una tela y la llevaremos en un transportín o caja de cartón con agujeros. Cada minuto o dos minutos, debemos comprobar que siga respirando. En caso de que deje de respirar, lee el apartado anterior sobre cómo realizar el RCP. Si respira con dificultad, abre el pico presionando con dos dedos los lados de la base del pico, y sopla con fuerza a unos 5 centímetros para que entre más aire.</Text>
                        </View>}

                        {sub_ids.includes(2) && <View>
                        <Text style={styles.title2}>Si está consciente y la respiración es rápida y superficial</Text>
                        <View style={styles.subdivider}/>
                        <Text style={styles.text}>Es posible que esté en shock.  No debemos darle comida ni agua puesto que no sabemos si puede tener heridas internas o daños nerviosos.</Text>
                        <Text style={styles.text}>Intentaremos cogerla de forma segura para evitar atropellos u otros accidentes. Para que no pierda calor, la envolveremos en una tela y la transportaremos en un transportín o caja de cartón con agujeros hasta llegar a la clínica. Debemos revisar cada poco tiempo que respira con normalidad. Si deja de respirar, lee el apartado de más arriba sobre cómo realizar el RCP. En caso de que no respire bien, podemos abrirle el pico presionando los lados de la base del pico con dos dedos y soplando con fuerza a unos 5 centímetros de él.</Text>
                        </View>}
                        
                        {sub_ids.includes(3) && <View>
                        <Text style={styles.title2}>Si se tambalea</Text>
                        <View style={styles.subdivider}/>
                        <Text style={styles.text}>Lo más probable es que tenga daños nerviosos o desorientación. No podremos hacer mucho aparte de cogerle de forma segura para evitar atropellos u otros accidentes, y acudir con urgencia a la clínica veterinaria. No debemos darle comida ni agua puesto que no sabemos si puede tener heridas internas o daños nerviosos.</Text>
                        </View>}
                        
                        {sub_ids.includes(4) && <View>
                        <Text style={styles.title2}>Si sangra por algún orificio corporal (pico, oídos, cloaca)</Text>
                        <View style={styles.subdivider}/>
                        <Text style={styles.text}>Probablemente tenga heridas internas. No podremos hacer mucho más que cogerle de forma segura, envolverle en una tela para que no pierda calor, ponerle en un transportín o caja de cartón y acudir con urgencia a la clínica veterinaria. No debemos darle comida ni agua puesto que no sabemos si puede tener heridas internas o daños nerviosos.</Text>
                        </View>}

                        {sub_ids.includes(7) && <View>
                        <Text style={styles.title2}>Si tiene vísceras visibles</Text>
                        <View style={styles.subdivider}/>
                        <Text style={styles.text}>Jamás intentaremos volver a introducir las vísceras, sino que las mantendremos húmedas con un paño o tejido limpio y suero fisiológico o agua limpia hasta llegar a la clínica veterinaria de urgencia.</Text>
                        </View>}
                        
                        {render_broken && <View>
                        <Text style={styles.title2}>Si lo que vemos es un ala o pata rota</Text>
                        <View style={styles.subdivider}/>
                        <Text style={styles.text}>También debemos acudir a la clínica veterinaria con urgencia. No debemos darle comida ni agua puesto que no sabemos si puede tener heridas internas o daños nerviosos. Clica aquí para acceder al protocolo de actuación en caso de <TouchableOpacity onPress={props.onScrollToBrokenWing}><Text style={styles.hypertext}>ala rota</Text></TouchableOpacity> o <TouchableOpacity onPress={props.onScrollToBrokenLeg}><Text style={styles.hypertext}>pata rota</Text></TouchableOpacity>. En caso de no poder llevarla a la clínica veterinaria inmediatamente, se debe coger con cuidado al animal, cortar la hemorragia (si la hay) presionando con una gasa o tela limpia durante al menos 15 minutos (las palomas tardan en coagular). Si la gasa o la tela se impregna de sangre, no debemos retirar las antiguas, pondremos otras limpias encima y seguiremos presionando. Transportaremos al animal en una caja o transportín hasta casa, preferentemente envuelto en una tela que mantenga el calor. Una vez en casa, podemos aplicar Betadine diluido al 50% o cristalmina para evitar que la herida se infecte. Si no disponemos de ellos, podemos aplicar miel o azúcar. Deberemos acudir a la clínica veterinaria lo antes posible.</Text>
                        <Text style={styles.title2}>Si tiene un ala o pata dislocada</Text>
                        <View style={styles.subdivider}/>
                        <Text style={styles.text}>No hay fractura ni herida abierta por la que salga hueso, pero la extremidad está en una posición no natural. La urgencia es menor aunque igualmente debemos ir a la clínica veterinaria ya que no sabemos la causa. Si vamos inmediatamente a la clínica, no debemos darle comida ni agua puesto que no sabemos si puede tener heridas internas o daños nerviosos. Ya esté el ala o pata rota o dislocada, la fijación la debe realizar une veterinarie, ya que un ala mal soldada puede dejar al animal sin volar el resto de su vida. Clica aquí para acceder al protocolo de actuación en caso de <TouchableOpacity onPress={props.onScrollToDislocatedWing}><Text style={styles.hypertext}>ala dislocada</Text></TouchableOpacity> o <TouchableOpacity onPress={props.onScrollToDislocatedLeg}><Text style={styles.hypertext}>pata dislocada</Text></TouchableOpacity>.</Text>
                        <Text style={styles.text}>También existe la posibilidad de que se trate de un caso de “splay leg”, o patas extendidas, que no supone una urgencia en sí pero debe valorarlo une veterinarie ya que se puede confundir con una fractura (abierta o cerrada).  En caso de que se le diagnostique un caso de splay leg, haz click <Pressable onPress={() => {
                            navigation.jumpTo('BasicCare')
                            dispatch(careActions.toggleSplayNav())
                        }}><Text style={styles.hypertext}>splay leg</Text></Pressable> para acceder a la información al respecto en el apartado de cuidados básicos.</Text>
                        </View>}
                    </View>
                )
            }
            else if (contentID == 6) {
                return (
                    <View style={styles.content}>
                        <Text style={styles.text}>Puede suceder por varios motivos. Debemos intentar identificar cómo ha sucedido para saber si existe riesgo de que tenga otras heridas más urgentes, como daños internos (por ejemplo, en caso de atropello o contusión). En caso de sospechar que puede estar en una situación grave, no debemos darle comida ni agua puesto que no sabemos si puede tener heridas internas o daños nerviosos, y acudiremos lo antes posible a la clínica veterinaria.</Text>
                        <Text style={styles.text}>Es una situación menos urgente, pero debe ser atendida en una clínica veterinaria.</Text>
                        <Text style={styles.text}>Si la luxación o dislocación está a la altura del hombro, veremos el ala en una posición no natural (probablemente caída rozando el suelo). Si la dislocación está a la altura del codo, normalmente se ve caída hacia el suelo o abierta hacia afuera.</Text>
                        <Text style={styles.text}>En cualquier caso, es necesario llevar al animal a la clínica veterinaria ya que se debe realizar un vendaje compresivo, y posiblemente haya fractura de algún hueso también. Un ala mal soldada puede dejar al animal sin volar el resto de su vida, de ahí la importancia de acudir a la clínica cuanto antes.</Text>
                        <Text style={styles.text}>Lo ideal en estos casos es no forzar el ala a volver a su posición natural, puesto que podríamos provocar más daños, como mucho la inmovilizaremos con una tela hacia el cuerpo para que no vaya a peor. Si no disponemos de transportín, buscaremos una caja de cartón (podemos pedirla en cualquier comercio) y la llevaremos a la clínica. Preferiblemente pondremos algo de tela para acolchar y que el animal no pierda más calor, ya que después de un accidente (ya sea por heridas internas o por el shock) pueden perder temperatura corporal.</Text>
                    </View>
                )
            }
            else if (contentID == 7) {
                return (
                    <View style={styles.content}>
                        <Text style={styles.text}>Puede suceder por varios motivos. Debemos intentar identificar cómo ha sucedido para saber si existe riesgo de que tenga otras heridas más urgentes, como daños internos (por ejemplo, en caso de atropello o contusión).</Text>
                        <Text style={styles.text}>En caso de ala rota, es posible que tenga herida abierta o que sea una fractura cerrada. Normalmente vemos el ala caída, pero si la fractura está en un punto lejano al hombro, es posible que esté en posición normal, de ahí la importancia de acudir a la clínica veterinaria para que hagan una exploración.</Text>
                        <Text style={styles.text}>Si la fractura es abierta (el hueso ha perforado la carne, incluso puede llegar a salir), no debemos intentar meter el hueso hacia adentro, podríamos causar más daños. Lo ideal es intentar tapar la hemorragia (si existe) aplicando presión con una gasa o tela limpia (puede tardar hasta 15 minutos), y después vendar la herida hasta que reciba asistencia veterinaria. Nunca debemos retirar la gasa o tela si está empapada en sangre, sólo aplicaremos otra encima si es necesario y seguiremos presionando. Una vez haya parado la hemorragia, si tenemos unas tijeras, podemos cortar las plumas de alrededor para mantener la herida lo más limpia y despejada posible.</Text>
                        <Text style={styles.text}>Colocaremos el ala dañada en posición natural pegada al cuerpo, aplicaremos la gasa con un poco de Betadine diluido al 50% con agua o Cristalmina (si tenemos) en la zona de la herida. Si no tenemos Betadine o clorhexidina a mano, podemos aplicar miel o azúcar para evitar que la herida se infecte hasta que podamos ir acudir a la clínica veterinaria, que, insistimos, debe ser lo antes posible. Vendaremos de esta forma:</Text>
                        <Text style={styles.text}>1. Pondremos el ala pegada al cuerpo en posición natural</Text>
                        <Text style={styles.text}>2. Usaremos un palmo y medio (unos 30cm) de venda. Fijaremos el ala al cuerpo pasando la venda por el pecho (por debajo del buche y delante de las patas) sin apretar demasiado para no comprimir el buche y que pueda respirar bien, y por debajo del ala sana. Lo ideal es que te ayude alguien sosteniendo las patas hacia atrás y levantando el ala sana para dejar vía libre durante el vendado.</Text>
                        <Text style={styles.text}>Si no dispones de vendas o gasas, intenta comprimir la herida con una tela o pañuelo y realizar un vendaje de la misma manera. En caso de no disponer de una tela lo suficientemente larga (con un palmo y medio sería suficiente), puedes sujetarlo colocando las dos manos en forma de corazón (cruzando los pulgares por la espalda de la paloma y con los cuatro dedos sujetando las patas) hasta llegar a la clínica veterinaria.</Text>
                        <Text style={styles.text}>3. Meteremos al ave en una caja de cartón con agujeros o transportín y lo llevaremos a la clínica veterinaria, vigilando cada pocos minutos que respire bien y que no pierda calor. Si no respira bien deberemos quitar el vendaje y volverlo a aplicar, es posible que la venda estuviese demasiado apretada. Si pierde calor, podemos acolchar el suelo de la caja con una tela o envolverla con ella.</Text>
                        <Text style={styles.text}>IMPORTANTE: No debemos darle comida ni agua puesto que no sabemos si puede tener heridas internas o daños nerviosos, en la clínica veterinaria nos recomendarán qué hacer a continuación.</Text>
                    </View> 
                )
            }
            else if (contentID == 8) {
                return (
                    <View style={styles.content}>
                        <Text style={styles.text}>Puede suceder por varios motivos. Debemos intentar identificar cómo ha sucedido para saber si existe riesgo de que tenga otras heridas más urgentes, como daños internos (por ejemplo, en caso de atropello o contusión). Si sospechamos que la causa ha sido un accidente grave, no debemos darle comida ni agua puesto que no sabemos si puede tener heridas internas o daños nerviosos.</Text>
                        <Text style={styles.text}>En caso de haber una pata rota, es importantísimo que se alineen los huesos cuanto antes sobre todo si es una fractura abierta (en la que sale el hueso), así que deberemos llevar al animal a la clínica veterinaria. Requerirá un periodo de reposo y rehabilitación, y posiblemente cirugía.</Text>
                        <Text style={styles.text}>Cogeremos al animal con cuidado de no presionar la pata para no empeorar la lesión. Si hay hemorragia, debemos cortarla presionando con una gasa o tela limpia durante al menos 15 minutos (las palomas tardan en coagular). Si la gasa o la tela se impregna de sangre, no debemos retirar las antiguas, pondremos otras limpias encima y seguiremos presionando. La meteremos en una caja de cartón con agujeros o transportín, preferiblemente con una tela que acolche el suelo de la caja para que también así no pierda calor. Una vez en casa, si la hemorragia ya ha parado, podemos aplicar Betadine (povidona yodada) diluido al 50% con agua, cristalmina (clorhexidina), y si no tenemos, miel o azúcar para evitar que la herida se infecte hasta que podamos ir acudir a la clínica veterinaria, que, insistimos, debe ser lo antes posible.</Text>
                        <Text style={styles.text}>También existe la posibilidad de que se trate de un caso de “splay leg”, o patas extendidas, que no supone una urgencia en sí pero deben valorarlo en la clínica veterinaria ya que se puede confundir con una fractura (abierta o cerrada).  En caso de que se diagnostique un caso de splay leg, haz click <TouchableOpacity onPress={() => {
                            navigation.jumpTo('BasicCare')
                            dispatch(careActions.toggleSplayNav())
                        }}><Text style={styles.hypertext}>splay leg</Text></TouchableOpacity> para acceder a la información al respecto en el apartado de cuidados básicos.</Text>
                    </View>
                )
            }
            else if (contentID == 9) {
                return (
                    <View style={styles.content}>
                        <Text style={styles.text}>Puede suceder por varios motivos. Debemos intentar identificar cómo ha sucedido para saber si existe riesgo de que tenga otras heridas más urgentes, como daños internos (por ejemplo, en caso de atropello o contusión). Si sospechamos que la causa ha sido un accidente grave, no debemos darle comida ni agua puesto que no sabemos si puede tener heridas internas o daños nerviosos.</Text>
                        <Text style={styles.text}>Es una situación menos urgente, pero es necesario igualmente llevar al animal a la clínica veterinaria ya que se debe realizar un vendaje compresivo, y posiblemente haya fractura de algún hueso también. Una pata mal soldada puede dejar al animal cojeando el resto de su vida, de ahí la importancia de acudir a la clínica cuanto antes.</Text>
                        <Text style={styles.text}>Lo ideal en estos casos es no forzar la pata para que vuelva a su posición natural, puesto que podríamos provocar más daños, por lo que si no disponemos de transportín, buscaremos una caja de cartón (podemos pedirla en cualquier comercio) y la llevaremos a la clínica. Preferiblemente pondremos algo de tela para acolchar y que el animal no pierda más calor, ya que después de un accidente (ya sea por heridas internas o por el shock) pueden perder temperatura corporal.</Text>
                        <Text style={styles.text}>También existe la posibilidad de que se trate de un caso de “splay leg”, o patas extendidas, que no supone una urgencia en sí pero deben valorarlo en la clínica veterinaria ya que se puede confundir con una fractura (abierta o cerrada).  En caso de que se diagnostique un caso de splay leg, haz click <TouchableOpacity onPress={() => {
                            navigation.jumpTo('BasicCare')
                            dispatch(careActions.toggleSplayNav())
                        }}><Text style={styles.hypertext}>splay leg</Text></TouchableOpacity> para acceder a la información al respecto en el apartado de cuidados básicos.</Text>
                    </View>
                )
            }
            else if (contentID == 10) {
                return (
                    <View style={styles.content}>
                        <Text style={styles.text}>La paramixovirosis es una enfermedad vírica para la cual no hay tratamiento, el tratamiento es sintomático.</Text>
                        <Text style={styles.text}>En la primera fase, esta enfermedad ocasiona heces diarreosas líquidas y con sangre. Podemos observar también que la paloma bebe mucho para recuperar el líquido que pierde con las diarreas.</Text>
                        <Text style={styles.text}>Cuando la enfermedad avanza, afecta también al sistema nervioso y es cuando aparece el retorcimiento primero de patas, y luego de cabeza.</Text>
                        <Text style={styles.text}>Es una enfermedad de la que se pueden recuperar. En el mejor de los casos vuelven a volar, algunas no pueden volar después de superar la enfermedad pero pueden llevar una vida normal. En cualquier caso, es primordial acudir a la clínica veterinaria para que hagan un reconocimiento y te den pautas más concretas.</Text>
                    </View>
                )
            }
            else if (contentID == 11) {
                return (
                    <View style={styles.content}>
                        <Text style={styles.text}>Las palomas con una infección por coccidios presentan los siguientes signos y síntomas: diarrea acuosa o mucosa, verdosa, beben mucha agua, no comen o comen muy poco, están débiles y cansadas, y, cuando la infección está muy avanzada, la diarrea también puede contener sangre.</Text>
                        <Text style={styles.text}>En este caso, debemos ir a la clínica veterinaria para que hagan un análisis de heces que confirme la coccidiosis y nos pauten medicación. Dependiendo de la gravedad de los síntomas, puede ser o no una urgencia veterinaria, pero en cualquier caso puede agravarse, así que debemos llevarla cuanto antes a la clínica veterinaria.</Text>
                    </View>
                )
            }
            else if (contentID == 12) {
                return (
                    <View style={styles.content}>
                        <Text style={styles.text}>Por lo general, si la paloma presenta costras en las patas, la base del pico o los ojos se debe a que sufre viruela. No es contagiosa para el humano ni otros mamíferos pero sí para otras aves, con lo que si convivimos con más aves debemos evitar que compartan espacio, comida y agua, y lavarnos bien las manos después de tocar al ave afectada.</Text>
                        <Text style={styles.text}>Para asegurarnos de que el animal sufre viruela, debemos acudir a la clínica veterinaria para que le realicen una exploración. Normalmente no se suele dar medicación, puesto que es un virus, y no podemos hacer más que ofrecerle una buena alimentación a la paloma y un lugar adecuado y resguardado del frío, lluvia, excesivo calor, etc. A veces se recomienda dar algún suplemento vitamínico para asegurarnos de que el animal obtiene todos los nutrientes que necesita. Para más información puedes consultar a tu veterinarie.</Text>
                    </View>
                )
            }
            else if (contentID == 13) {
                return (
                    <View style={styles.content}>
                        <Text style={styles.text}>Estas placas blancas o amarillentas normalmente son tricomonas, un parásito interno que se encuentra en la garganta, esófago y buche, aunque en una infección más avanzada también salen por fuera del pico.</Text>
                        <Text style={styles.text}>Las aves con tricomoniasis grave presentan: respiración dificultosa (las placas blancas obstruyen el esófago), y heces con olor fuerte y agrio, así que si vemos tanto las placas blancas como este tipo de heces, debemos llevar al animal a la clínica veterinaria cuanto antes.</Text>
                        <Text style={styles.text}>Esta infección por tricomonas se cura con Flagyl, antibiótico en jarabe de uso humano que podemos encontrar en farmacias. Sin embargo, lo ideal es que en la clínica veterinaria le hagan un examen del buche y heces para corroborar que son tricomonas y nos den la pauta del tratamiento.</Text>
                    </View>
                )
            }
            else if (contentID == 14) {
                return (
                    <View style={styles.content}>
                        <Text style={styles.text}>Debemos llevar muchísimo cuidado al retirarlos, ya que si están muy apretados se pueden provocar heridas o romper los huesos (es posible que ya lo estén). Por ello, si los pelos o hilos están muy incrustados en la carne, es mejor que los retiren en la clínica veterinari para evitar causar un mal mayor.</Text>
                        <Text style={styles.text}>Si decides quitarlos, antes de tirar de los hilos, debemos usar una tijera para cortarlos y, una vez estén cortados, usaremos unas pinzas de depilar para tirar cuidadosamente de ellos. Si vemos que siguen enmarañados, procederemos a cortar por otro lugar hasta que salgan con facilidad.</Text>
                    </View>
                )
            }
            else if (contentID == 15) {
                return (
                    <View style={styles.content}>
                        <Text style={styles.text}>En caso de que creamos que la paloma está envenenada, no podemos hacer más que acudir con ella a la clínica veterinaria de urgencia.</Text>
                        <Text style={styles.text}>Por lo general, una paloma envenenada está aletargada, pero en caso de que aún no lo esté, intentaremos cogerla de forma segura para evitar atropellos u otros accidentes.</Text>
                        <Text style={styles.text}>Para que no pierda calor, la envolveremos en una tela y la transportaremos en un transportín o caja de cartón con agujeros hasta la clínica veterinaria. Debemos revisar cada poco tiempo que respira con normalidad. Si deja de respirar, lee el apartado de más arriba sobre <TouchableOpacity onPress={props.onScrollToNoPulse}><Text style={styles.hypertext}>cómo realizar el RCP</Text></TouchableOpacity>. En caso de que no respire bien, podemos abrirle el pico presionando los lados de la base del pico con dos dedos y soplando con fuerza a unos 5 centímetros de él.</Text>
                        <Text style={styles.text}>No se debe administrar comida ni agua.</Text>
                    </View>
                )
            }
            else if (contentID == 16) {
                return (
                    <View style={styles.content}>
                        <Text style={styles.text}>Un golpe de calor se deduce cuando encontramos al animal sin ningún otro tipo de heridas o contusiones, y en unas condiciones que lo propicien (temperaturas, exposición al sol). Es una urgencia veterinaria.</Text>
                        <Text style={styles.text}>Si la paloma presenta un <Text style={styles.textBold}>inicio</Text> de golpe de calor, la pondremos a la sombra e intentaremos darle agua con azúcar o algún sirope disuelto en una cuchara o con una jeringa si disponemos de ella. La podemos pedir en cualquier cafetería o bar (un vaso de agua de grifo, un azucarillo y una cuchara). Siempre debemos observar que se reduzcan los síntomas de golpe de calor, en caso de que no se reduzcan, debemos acudir a la clínica de urgencias.</Text>
                        <Text style={styles.text}>Si el animal presenta signos de golpe de calor <Text style={styles.textBold}>avanzado</Text>, debemos acudir a la clínica veterinaria lo antes posible. Mientras tanto, se puede mojar o sumergir al animal, en caso de que no tenga otro tipo de lesiones (heridas, fracturas, etc.) con cuidado de no bajar su temperatura corporal demasiado rápido, ya que podría resultar perjudicial. Usaremos agua tibia y, muy poco a poco, en el transcurso de 4-5 minutos, pasarle a agua más fresca. Si no podemos mojarla o sumergirla, empaparemos una tela con agua fresca y la colocaremos en ingles, axilas o patas. Por supuesto, también le ofreceremos agua para beber, preferentemente con un poco de azúcar disuelto.</Text>
                        <Text style={styles.text}>Si el animal <Text style={styles.textBold}>no está consciente</Text>, examinaremos su cuerpo para ver que el corazón late y que respira. (Si no tiene pulso, clica <TouchableOpacity onPress={props.onScrollToNoPulse}><Text style={styles.hypertext}>aquí</Text></TouchableOpacity>; si hay pulso pero no respira, clica <TouchableOpacity onPress={props.onScrollToArtificialBreathing}><Text style={styles.hypertext}>aquí</Text></TouchableOpacity>). También buscaremos heridas, fracturas, etc. En caso de que tenga pulso, respire y no tenga heridas o fracturas, mientras vamos a la clínica de urgencias, la colocaremos en un ambiente fresco, empaparemos una tela con agua fresca y la colocaremos en ingles, axilas o patas. También podemos envolverla en una tela mojada durante el transporte. Debemos llevar cuidado de que no se golpee o zarandee la cabeza para no provocar lesiones.</Text>
                    </View>
                )
            }
            else if (contentID == 21) {
                return (
                    <View style={styles.content}>
                        <Text style={styles.text}>Sucede cuando el cuerpo pierde temperatura muy rápidamente, es una emergencia. La temperatura normal de una paloma es de unos 38-39ºC, sería preocupante que la temperatura corporal fuera de 1.5ºC menos. Suelen presentar agotamiento, escalofríos, temblores e incluso la pérdida de consciencia. Si el animal está frío y no está consciente, comprueba <TouchableOpacity onPress={props.onScrollToNoPulse}><Text style={styles.hypertext}>si tiene pulso</Text></TouchableOpacity> colocando el dedo índice y corazón sobre su corazón (parte izquierda del pecho, bajo el ala) o si necesita <TouchableOpacity onPress={props.onScrollToArtificialBreathing}><Text style={styles.hypertext}>respiración artificial</Text></TouchableOpacity>.</Text>
                        <Text style={styles.text}>Si tiene pulso y respira, pasamos a medir la temperatura corporal introduciendo la punta de un termómetro lubricado por la cloaca, si no tenemos termómetro podemos colocar los dedos índice y corazón bajo el ala, debe notarse caliente. También podemos mirar el interior del pico, donde las mucosas (la lengua y alrededores) se verán pálidos en caso de hipotermia.</Text>
                        <Text style={styles.text}>Si el ave está mojada, podemos secarla con un secador o hacerla entrar en calor abrigándola. También podemos hacer que recupere temperatura bañándola en agua templada y subiendo muy poco a poco la temperatura del agua para no provocar un cambio brusco de temperatura corporal. Después deberemos abrigarla o secarla con un secador o toalla. Se puede también colocar al animal al sol, siempre bajo vigilancia para no pasar al opuesto y que le dé un golpe de calor.</Text>
                        <Text style={styles.text}>En caso de que la paloma no esté mojada pero tenga hipotermia, podemos abrigarla o calentarla con un secador, no sería recomendable mojarla con agua caliente para que luego no tengamos que secarla y provocarle más estrés.</Text>
                    </View>
                )
            }
            else if (contentID == 17) {
                return (
                    <View style={styles.content}>
                        <Text style={styles.text}>En el caso de una mordedura, trataremos al animal con mucho cuidado ya que, normalmente, solemos ver un orificio abierto pero suele haber más (son las incisiones de los dientes). En el caso de sufrir la mordedura de un perro, la paloma probablemente tendrá 4 orificios de los colmillos; en el caso de un gato, suelen ser 2 orificios.</Text>
                        <Text style={styles.text}>Puesto que no sabemos si la mordedura ha dañado algún órgano interno, deberemos llevar a la paloma a la clínica veterinaria lo antes posible. Si tiene vísceras visibles, jamás intentaremos volver a introducir las vísceras, sino que las mantendremos húmedas con un paño o tejido limpio y suero fisiológico o agua limpia hasta llegar a la clínica veterinaria de urgencia.</Text>
                        <Text style={styles.text}>Si no es posible llevarla inmediatamente, se debe coger con cuidado al animal, cortar la hemorragia (si la hay) presionando con una gasa o tela limpia durante al menos 15 minutos (las palomas tardan en coagular). Si la gasa o la tela se impregna de sangre, no debemos retirar las antiguas, pondremos otras limpias encima y seguiremos presionando. Transportaremos al animal en una caja o transportín hasta casa, preferentemente envuelto en una tela que mantenga el calor. Una vez en casa, podemos aplicar Betadine diluido al 50% o cristalmina para evitar que la herida se infecte. Si no disponemos de ellos, podemos aplicar miel o azúcar. Deberemos acudir a la clínica veterinaria lo antes posible, ya que es extremadamente doloroso para el animal y necesitará asistencia.</Text>
                    </View>
                )
            }
            else if (contentID == 18) {
                return (
                    <View style={styles.content}>
                        <Text style={styles.title2}>Reanimación cardiopulmonar (RCP)</Text>
                        <View style={styles.subdivider}/>
                        <Text style={styles.text}>1. Pondremos la paloma recostada sobre su lado derecho y ubicaremos el corazón a la izquierda de la quilla (la quilla es el hueso que tienen en el centro de la caja torácica)</Text>
                        <Text style={styles.text}>2. Le mantendremos la cabeza recta el pico abierto con los dedos, o poniendo un palito o palillo atravesado en horizontal, o presionando la base del pico a cada lado para que le pueda entrar aire.</Text>
                        <Text style={styles.text}>3. Con la yema del dedo índice y corazón haremos 15 pulsaciones en el centro de la pechuga izquierda (la que ha quedado hacia arriba), firmes pero sin pasarnos de presión para evitar romper las costillas y causar males mayores.</Text>
                        <Text style={styles.text}>4. Después de las 15 pulsaciones le soplaremos en el pico una vez durante unos 3 segundos, esperaremos 2 segundos, y soplaremos de nuevo otros 3 segundos, con fuerza, a una distancia de unos 5 centímetros. Debemos ver que el pecho se infla, pero teniendo en cuenta que la cantidad de aire que le soplemos es mayor que su capacidad pulmonar, así que no debemos pasarnos.</Text>
                        <Text style={styles.text}>5. Repetiremos este procedimiento de 15 pulsaciones + 2 soplidos durante varios minutos. Si el corazón empieza a latir, seguiremos con la respiración artificial. Pasados unos 10 minutos, es difícil que podamos reanimar al animal.</Text>
                    </View>
                )
            }
            else if (contentID == 20) {
                return (
                    <View style={styles.content}>
                        <Text style={styles.text}>En las palomas no existe el vómito (puesto que el contenido sale desde el buche hacia el pico, y no desde el estómago).</Text>
                        <Text style={styles.text}>De todas formas, es algo muy raro y debemos acudir a la clínica veterinaria de urgencias.</Text>
                        <Text style={styles.text}>No podemos hacer gran cosa para evitarlo. Obviamente no ofreceremos agua ni alpiste al animal que está regurgitando.</Text>
                        <Text style={styles.text}>Puede suceder (si vas en transporte) que el animal se maree. Puedes colocar el transportín en sentido a la marcha y, si estáis en transporte propio, puedes intentar sacarle del transportín siempre de forma segura y colocarle mirando en dirección a la marcha, o parar el coche hasta que deje de regurgitar.</Text>
                        <Text style={styles.text}>Si no para, acudiremos a la clínica veterinaria de urgencias.</Text>
                    </View>
                )
            }
            else if (contentID == 22) {
                return (
                    <View style={styles.content}>
                        <Text style={styles.title2}>Respiración Artificial</Text>
                        <View style={styles.subdivider}/>
                        <Text style={styles.text}>Debemos comprobar si el corazón late acercando la oreja a la parte izquierda de su cuerpo, bajo el ala, o localizando el corazón con los dedos índice y corazón. Si no late, realizaremos la <TouchableOpacity onPress={props.onScrollToNoPulse}><Text style={styles.hypertext}>reanimación cardiopulmonar</Text></TouchableOpacity></Text>
                        <Text style={styles.text}>Si hay pulso, observaremos el interior de la boca por si tiene un objeto que se lo impide (<TouchableOpacity onPress={props.onScrollToChoking}><Text style={styles.hypertext}>atragantamiento</Text></TouchableOpacity>) o si se ha ahogado (<TouchableOpacity onPress={props.onScrollToAsphyxiation}><Text style={styles.hypertext}>ahogamiento</Text></TouchableOpacity>).</Text>
                        <Text style={styles.text}>Si no tiene objeto extraño en la garganta ni agua en los pulmones, empezaremos la respiración artificial.</Text>
                        <Text style={styles.text}>1. Pondremos la paloma recostada sobre su lado derecho y ubicaremos el corazón a la izquierda de la quilla (la quilla es el hueso que tienen en el centro de la caja torácica.</Text>
                        <Text style={styles.text}>2. Le mantendremos la cabeza recta y el pico abierto con los dedos, o poniendo un palito o palillo atravesado en horizontal, o presionando la base del pico a cada lado para que le pueda entrar aire.</Text>
                        <Text style={styles.text}>3. Le soplaremos en el pico una vez durante unos 3 segundos, esperaremos 2 segundos, y soplaremos de nuevo otros 3 segundos, con fuerza, a una distancia de unos 5 centímetros. Debemos ver que el pecho se infla, pero teniendo en cuenta que la cantidad de aire que le soplemos es mayor que su capacidad pulmonar, así que no debemos pasarnos.</Text>
                        <Text style={styles.text}>4. Comprobaremos que el corazón sigue latiendo. Si no hay pulso, le haremos la <TouchableOpacity onPress={props.onScrollToNoPulse}><Text style={styles.hypertext}>reanimación cardiopulmonar (RCP)</Text></TouchableOpacity>. Si late, seguiremos con este procedimiento hasta que respire por sí sola (puede tardar hasta una hora).</Text>
                        <Text style={styles.text}>Después de este procedimiento, envolveremos a la paloma en una tela con las alas en posición normal, y la trasladaremos en una caja o transportín (donde esté lo más tranquila posible) hasta la clínica veterinaria, comprobando cada poco tiempo que sigue latiendo y respirando.</Text>
                    </View>
                )
            }
            else if (contentID == 23) {
                return (
                    <View style={styles.content}>
                        <Text style={styles.text}>Si el animal <Text style={styles.textBold}>está consciente</Text> pero tose, espera a ver si puede expulsar el objeto. Puedes ofrecerle agua o comida; si traga, la situación no es una emergencia y lo mejor es llevarle a la clínica veterinaria cuanto antes.</Text>
                        <Text style={styles.text}>Si la paloma no traga, jadea, boquea, estira el cuello o sus mucosas (como la lengua) se vuelven azuladas o grises debemos actuar rápido.</Text>
                        <Text style={styles.text}>1. Abre el pico.</Text>
                        <Text style={styles.text}>2. Busca el objeto con la vista, puede que necesites una linterna (como la del móvil).</Text>
                        <Text style={styles.text}>3. Si ves el objeto en su garganta, intenta inmovilizar al animal para no hacerle más daño. Coge una tela y envuelve su cuerpo con las alas en posición normal. Después intenta inmovilizar la cabeza y sacar el objeto o moverlo hacia afuera, siempre y cuando veas que tiene fácil acceso y no lo vas a empujar hacia la garganta.</Text>
                        <Text style={styles.text}>4. Si crees que el objeto es punzante o está clavado, al sacarlo puedes provocar un sangrado o asfixia, así que debes valorar qué conlleva más riesgo (si dejarlo clavado o sacarlo). En caso de dejarlo clavado, debes estar segure de que no se va a mover hacia adentro.</Text>
                        <Text style={styles.text}>5. Si la paloma <Text style={styles.textBold}>está inconsciente y le puedes sacar el objeto</Text> sin causarle más daños ni meterlo hacia adentro, hazlo con la ayuda de un palillo o ramita (se supone que no se va a mover). Acto seguido, envuélvela con una tela para que no pierda calor (con las alas en posición natural) y llévala lo antes posible a consulta veterinaria con cuidado de que no se zarandee la cabeza. Ve comprobando que tiene pulso durante el trayecto. Si deja de tener pulso, deberás hacerle la <TouchableOpacity onPress={props.onScrollToNoPulse}><Text style={styles.hypertext}>reanimación cardiopulmonar (RCP)</Text></TouchableOpacity>. Si deja de respirar pero tiene pulso, deberás llevar a cabo la <TouchableOpacity onPress={props.onScrollToArtificialBreathing}><Text style={styles.hypertext}>respiración artificial</Text></TouchableOpacity>.</Text>
                        <Text style={styles.text}>6. Si la paloma <Text style={styles.textBold}>está inconsciente y no ves el objeto</Text>, ponla boca abajo y agítala suavemente a ver si la gravedad ayuda a que lo expulse, con cuidado de no hacerle daño, golpearla, etc. </Text>
                        <Text style={styles.text}>7. Si nada de esto sirve para expulsar el objeto de la garganta, como último recurso le haremos la maniobra de Heimlich, tanto si está consciente como si no. Colocaremos las dos manos a los lados del animal dejando las alas por fuera. Haremos compresiones cortas y repetidas desde los lados, firmemente pero con cuidado de no hacer demasiada presión. Es posible que rompamos alguna costilla, pero si sirve para que expulse el objeto y respire de nuevo, es un riesgo que debemos correr.</Text>
                        <Text style={styles.text}>8. En cualquier caso de los anteriores, si conseguimos que la paloma respire de nuevo, deberemos llevarla a consulta veterinaria para que le hagan una revisión general.</Text>
                    </View>
                )
            }
            else if (contentID == 24) {
                return (
                    <View style={styles.content}>
                        <Text style={styles.text}>Si <Text style={styles.textBold}>no tiene pulso</Text>, cogeremos a la paloma con las dos manos en forma de corazón, abarcando las alas en posición normal, y la pondremos boca abajo. Como no estará consciente podemos agitarla suavemente para que salga el agua por gravedad. Cuando ya no salga agua, realizaremos la <TouchableOpacity onPress={() => {props.onScrollToNoPulse}}><Text style={styles.hypertext}>reanimación cardiopulmonar (RCP)</Text></TouchableOpacity>.</Text>
                        <Text style={styles.text}>Si <Text style={styles.textBold}>no respira</Text> pero tiene pulso, deberás llevar a cabo la <TouchableOpacity onPress={props.onScrollToArtificialBreathing}><Text style={styles.hypertext}>respiración artificial</Text></TouchableOpacity></Text>
                        <Text style={styles.text}>Si <Text style={styles.textBold}>tiene pulso y está consciente</Text>, lo primero que debemos tener en cuenta es que la paloma que haya caído al agua y se esté ahogando, se pondrá nerviosa con nuestra manipulación, así que debemos evitar gritos o sonidos estridentes.</Text>
                        <Text style={styles.text}>Cogeremos al animal con las dos manos en forma de corazón, abarcando también las alas y la pondremos boca abajo para que el agua caiga por gravedad. Si está inconsciente podemos ponerla boca abajo y agitarla suavemente con la misma finalidad, sujetando su cabeza por los lados con los índices.</Text>
                        <Text style={styles.text}>Una vez la paloma recupere la consciencia y respire con relativa normalidad, la envolveremos en una tela con las alas en posición normal y la llevaremos a consulta veterinaria para que le hagan una revisión. Deberemos meterla en una caja de cartón con agujeros o en un transportín para minimizar el estrés.</Text>
                    </View>
                )
            }
            else if (contentID == 25) {
                return (
                    <View style={styles.content}>
                        <Text style={styles.text}>Si el cuerpo extraño es <Text style={styles.textBold}>visible</Text>, es decir, está externo, debemos explorarlo con mucho cuidado y de forma minuciosa para determinar qué es. Si no podemos extraerlo, acudiremos a la clínica veterinaria.</Text>
                        <Text style={styles.text}>Si podemos extraerlo y procedemos a ello, debemos tener presente que es posible que la herida sangre, así que deberemos preparar con antelación gasas estériles (a poder ser) o una tela para ejercer presión sobre la herida. Presionaremos durante al menos 15 minutos (las palomas tardan en coagular) y, si la tela o gasa se empapan, no la retiraremos sino que colocaremos otra encima y seguiremos presionando. Si hay sangrado, lo ideal es acudir a la clínica veterinaria por si hicieran falta puntos o medicación.</Text>
                        <Text style={styles.text}>En caso de que el cuerpo extraño esté alojado dentro del animal, es decir, sea <Text style={styles.textBold}>interno</Text>, es posible que haya llegado ahí porque lo haya ingerido (que se alojará probablemente en buche o estómago), o por la nariz (y llegará a pulmones o tejidos cercanos). En caso de que el cuerpo extraño sea interno, no podremos hacer más que acudir a la clínica veterinaria para que le hagan las pruebas pertinentes con el fin de determinar qué es, dónde está alojado y qué hacer al respecto.</Text>
                        <Text style={styles.text}>Si la paloma está intentando tragar algo pero se le queda atascado en la garganta, boqueará, sacudirá la cabeza o intentará jadear. En ese caso, haz clic <TouchableOpacity onPress={props.onScrollToChoking}><Text style={styles.hypertext}>aquí</Text></TouchableOpacity>.</Text>
                    </View>
                )
            }
            else if (contentID == 26) {
                return (
                    <View style={styles.content}>
                        <Text style={styles.text}>Debemos evitar siempre hacer que camine hacia carreteras, calles transitadas por donde pasen coches, etc., así que, si es necesario, daremos un rodeo para encaminar al ave hacia una zona poco transitada, la acera o hacia la pared o algún recoveco que podamos usar para cogerla con facilidad.</Text>
                        <Text style={styles.text}>Idealmente usaremos una pieza de tela grande (toalla, sábana, chaqueta, jersey, pañuelo…) para echárselo por encima y evitar que salga volando o se pueda hacer daño. Una vez la hayamos cubierto con la tela, le cogeremos poniendo las dos manos en forma de corazón, colocando los pulgares por la espalda y los cuatro dedos restantes sujetando por debajo del cuerpo y las patas, de manera que éstas queden en posición natural.</Text>
                        <Text style={styles.text}>Es momento de realizar una pequeña exploración. A continuación tienes el formulario de urgencias. Cuando contestes las preguntas te daremos más pautas.</Text>
                        <Text style={styles.text}>Después de la exploración, colócale en una caja (puedes pedir alguna en un comercio, supermercado, etc.) o transportín y llévale a la clínica veterinaria. Si no dispones de caja o transportín, enróllala con la tela de forma que las alas y las patas queden en posición natural. Encontrarás clínicas <TouchableOpacity onPress={() => {navigation.navigate('Map')}}><Text style={styles.hypertext}>aquí</Text></TouchableOpacity>.</Text>
                        <Text style={styles.text}>Si <Text style={styles.textBold}>no puedes coger al animal</Text>, lo ideal es pedir ayuda ya sea a tu/s acompañante/s (si vas acompañade), o a alguien por la calle. En caso de no poder tampoco en este caso, <TouchableOpacity onPress={() => {
                            navigation.jumpTo('ExternalResources')
                        }}><Text style={styles.hypertext}>aquí</Text></TouchableOpacity> te dejamos enlaces a grupos de Facebook donde poder pedir ayuda.</Text>
                    </View>
                )
            }
            else if (contentID == 27) {
                return(
                    <View style={styles.content}>
                        <Text style={styles.text}>La puesta de huevos puede provocar que la paloma esté aletargada, respire rápida y superficialmente, tenga el abdomen hinchado y cojee o tenga una pata inmóvil. Haz click <TouchableOpacity onPress={() => {
                            navigation.jumpTo('BasicCare')
                            dispatch(careActions.toggleEggsNav())
                        }}><Text style={styles.textBold}>aquí</Text></TouchableOpacity> para acceder al apartado de manejo básico donde explicamos más detalladamente qué hacer en diferentes situaciones.</Text>
                    </View>
                )
            }
            else if (contentID == 28) {
                return(
                    <View style={styles.content}>
                        <Text style={styles.text}>Si la paloma tiene una alimentación equilibrada compuesta por semillas variadas y pienso enriquecido con vitaminas y calcio, la puesta de huevos suele ser un proceso sin complicaciones. Sin embargo, como en todas las aves, la puesta de huevos puede conllevar algunos problemas. Los más habituales son:</Text>
                        <Text style={styles.text}>- <Text style={styles.textBold}>Cojera:</Text> puede producirla el paso del huevo por el oviducto hasta el exterior, que pinza el nervio ciático. Sin embargo, el paso del huevo también puede provocar una fractura de cadera, por lo que es imprescindible acudir al centro veterinario para que hagan una radiografía y hacer un diagnóstico. En el caso de pinzamiento del nervio, probablemente le recetará reposo y antiinflamatorio. En caso de fractura, le veterinarie recomendará cuál es el mejor tratamiento.</Text>
                        <Text style={styles.text}>- <Text style={styles.textBold}>Huevos malformados:</Text> puede suceder que un huevo sea expulsado con la cáscara muy blanda o prácticamente sin cáscara. Esto suele indicar una deficiencia de calcio en el organismo de la paloma. En caso de que veamos un huevo malformado, deberíamos ir al centro veterinario para que nos aconsejen cómo evitarlo en el futuro, probablemente con suplementación alimentaria.</Text>
                        <Text style={styles.text}>- <Text style={styles.textBold}>Protrusión:</Text> puede suceder que una parte del oviducto salga al exterior junto con el huevo. En este caso, jamás intentaremos volver a introducir las vísceras, sino que las mantendremos húmedas con un paño o tejido limpio y suero fisiológico o agua limpia hasta llegar a la clínica veterinaria de urgencia.</Text>
                        <Text style={styles.text}>- <Text style={styles.textBold}>Retención de huevos:</Text> en caso de sufrir retención de huevos, veremos que el animal tiene el abdomen hinchado, respira rápida y superficialmente, y puede cojear o tener una pata inmóvil. Lo único que podemos hacer es intentar lubricar la zona de la cloaca para ayudar a la expulsión del huevo, pero en caso de que tarde, debemos acudir a la clínica veterinaria, probablemente realizarán una cirugía para extraer el huevo.</Text>
                        <Text style={styles.text}>Hay veterinaries que recomiendan poner el implante hormonal que inhibe la ovulación y puesta de huevos en las aves, es el único tratamiento efectivo para evitar la puesta de huevos y todos los problemas que puede conllevar. El implante que se usa habitualmente se llama Suprelorin, y suele tener una efectividad de unos 6 meses, aunque a partir del cuarto mes debemos estar pendientes de posibles cambios en el comportamiento de la paloma por si se empieza a pasar el efecto del implante.</Text>
                    </View>
                )
            }
        }
    }

    // <TouchableOpacity onPress={() => {props.onScrollToNoPulse}}>Section name<Text style={{}}></Text></TouchableOpacity></Text>

    const toggleContent = () => {
        setIsContentHidden(!isContentHidden)
        if(isContentHidden) {
            setIconName('up')
        } else {
            setIconName('down')
        }
    }

  return (
    <View>
        <TouchableOpacity activeOpacity={0.8} style={styles.accordionHeader} onPress={toggleContent}>
            <Text style={styles.title}>{title}</Text>
            <AntDesign name={iconName} size={20} color={Colors.primary} />
        </TouchableOpacity>
        {!isContentHidden && renderContent()}
    </View>
  )
}

export default AccordionItem

const styles = StyleSheet.create({
    accordionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 50,
        alignItems: 'center',
        marginVertical: 10
    },
    title: {
        fontFamily: 'montserrat-bold',
        fontSize: 18,
        color: Colors.primary,
        maxWidth: '85%'
    },
    content: {
        justifyContent: 'flex-start',
        paddingLeft: 20,
        paddingRight: 20
    },
    text: {
        fontFamily: 'montserrat',
        color: 'white',
        fontSize: 14,
        marginBottom: 10
    },
    title2: {
        fontFamily: 'montserrat-bold',
        fontSize: 16,
        color: Colors.primary,
        marginBottom: 5
    },
    subdivider: {
        height: 2,
        width: Dimensions.get('window').width*0.87,
        backgroundColor: "#aaa",
        marginBottom: 10
    },
    hypertext: {
        fontFamily: 'montserrat-bold',
        fontSize: 14,
        color: '#bfffc1',
        textDecorationLine: 'underline',
    },
    textBold: {
        fontFamily: 'montserrat-bold', 
        color: '#bfffc1'
    }
})